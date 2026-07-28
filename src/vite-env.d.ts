/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CREDIT_API_URL?: string;
  readonly VITE_CREDIT_API_TOKEN?: string;
  readonly VITE_FAST2SMS_KEY?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
