interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly [key: string]: string | undefined;
  readonly NG_APP_EMAIL_SERVICE_ID: string;
  readonly NG_APP_EMAIL_TEMPLATE_ID: string;
  readonly NG_APP_EMAIL_PUBLIC_KEY: string;
}
