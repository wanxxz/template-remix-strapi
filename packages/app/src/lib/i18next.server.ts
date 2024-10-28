import { createCookie } from '@remix-run/node'
import { RemixI18Next } from 'remix-i18next/server'
import { i18nextOptions } from './i18next'

const localeCookie = createCookie('lng', {
  path: '/',
  sameSite: 'lax',
  secure: import.meta.env.PROD,
  httpOnly: true
})

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nextOptions.supportedLngs as never,
    fallbackLanguage: i18nextOptions.fallbackLng as never,
    cookie: localeCookie
  },
  i18next: {
    ...i18nextOptions
  }
})

export { i18next, localeCookie }
