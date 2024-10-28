import createDataProvider from '@refinedev/graphql'
import { Client, fetchExchange } from '@urql/core'
import { vars } from 'src/vars'

const gqlClient = new Client({ url: vars.apiURL, exchanges: [fetchExchange] })

const dataProvider = createDataProvider(gqlClient)

export { dataProvider }
