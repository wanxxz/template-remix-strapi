import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import i18nextHTTPBackend from 'i18next-http-backend'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next/client'
import { i18nextOptions } from 'src/lib/i18next'

async function hydrate() {
  await i18next
    .use(initReactI18next)
    .use(i18nextBrowserLanguageDetector)
    .use(i18nextHTTPBackend)
    .init({
      ...i18nextOptions,
      ns: getInitialNamespaces(),
      detection: {
        order: ['htmlTag'],
        caches: []
      }
    })

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18nextProvider>
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  window.setTimeout(hydrate, 1)
}
