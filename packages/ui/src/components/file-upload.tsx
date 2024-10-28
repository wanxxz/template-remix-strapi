import { UploadIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, FileTrigger, FileTriggerProps } from 'react-aria-components'

interface FileUploadProps {
  defaultValue?: File[]
  onFileChange?: (files: File[]) => void
}

function FileUpload(props: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const acceptedFileTypes = ['image/png', 'image/jpeg']

  useEffect(() => {
    props?.defaultValue && setFiles(props.defaultValue)
  }, [props?.defaultValue])

  const onSelect: FileTriggerProps['onSelect'] = fileList => {
    if (!fileList?.[0]) return
    setFiles(files => {
      const a = [...files, fileList[0]]
      props?.onFileChange?.(a)
      return a
    })
  }

  const onDelete = (i: number) =>
    setFiles(files => {
      const a = files.filter((_, ii) => ii !== i)
      props?.onFileChange?.(a)
      return a
    })

  return (
    <div className="grid grid-cols-3 gap-2">
      {files.map((file, i) => (
        <div className="relative" key={`${file.name}|${i}`}>
          <img
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            width="300"
            src={URL.createObjectURL(file) || '/img/placeholder.svg'}
          />
          <Button
            onPress={() => onDelete(i)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-6 w-6 rounded-full absolute top-1 left-1 hover:bg-slate-300/20 hover:bg-accent hover:text-accent-foreground "
          >
            <XIcon className="h-4 w-4 text-slate-300" />
          </Button>
        </div>
      ))}
      <FileTrigger allowsMultiple acceptedFileTypes={acceptedFileTypes} onSelect={onSelect}>
        <Button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
          <UploadIcon className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </Button>
      </FileTrigger>
    </div>
  )
}

export { FileUpload, type FileUploadProps }
