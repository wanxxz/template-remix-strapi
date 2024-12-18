import { useSelect } from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { GraphQLClient } from 'graphql-request'
import { useEffect } from 'react'
import type { IPost } from 'src/interfaces'
import { dataProvider } from 'src/lib/data-provider'
import { vars } from 'src/vars'

const PostEdit: React.FC = () => {
  const { initialData } = useLoaderData<typeof loader>()

  const {
    refineCore: { onFinish, formLoading, query: queryResult },
    register,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({
    warnWhenUnsavedChanges: true,
    refineCoreProps: {
      queryOptions: {
        initialData
      }
    }
  })

  const { options } = useSelect({
    resource: 'categories',
    defaultValue: queryResult?.data?.data.category.id
  })

  useEffect(() => {
    resetField('category.id')
  }, [options])

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register('title', { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Status: </label>
      <select {...register('status')}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Category: </label>
      <select
        {...register('category.id', {
          required: true
        })}
        defaultValue={queryResult?.data?.data.category.id}
      >
        {options?.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {errors.category && <span>This field is required</span>}
      <br />
      <label>Content: </label>
      <br />
      <textarea {...register('content', { required: true })} rows={10} cols={50} />
      {errors.content && <span>This field is required</span>}
      <br />
      <input type="submit" value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  )
}

export default PostEdit

export async function loader({ params }: LoaderFunctionArgs) {
  const data = await dataProvider.getOne<IPost>({
    resource: 'posts',
    id: params?.id as string
  })

  return json({ initialData: data })
}
