import { createReadableStreamFromReadable, type EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { createInstance } from 'i18next'
import i18nextHTTPBackend from 'i18next-http-backend'
import { isbot } from 'isbot'
import { PassThrough } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { i18nextOptions } from 'src/lib/i18next'
import { i18next } from 'src/lib/i18next.server'

const ABORT_DELAY = 5_000

async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise(async (resolve, reject) => {
    let instance = createInstance()
    let lng = await i18next.getLocale(request)
    let ns = i18next.getRouteNamespaces(remixContext)

    await instance
      .use(initReactI18next)
      .use(i18nextHTTPBackend)
      .init({
        ...i18nextOptions,
        lng,
        ns,
        backend: {
          loadPath: `${new URL(request.url).origin}/locales/{{lng}}/{{ns}}.json`
        }
      })

    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />
      </I18nextProvider>,
      {
        [isbot(request.headers.get('user-agent')) ? 'onAllReady' : 'onShellReady']: () => {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          // log streaming rendering errors from inside the shell
          // don't log errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest
          if (shellRendered) {
            console.error(error)
          }
        }
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

export default handleRequest
