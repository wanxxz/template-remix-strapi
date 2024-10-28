/// <reference types="vite/client" />
/// <reference types="@remix-run/node/globals" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
