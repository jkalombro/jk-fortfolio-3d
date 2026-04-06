export const environment = {
  production: false,
  version: '1.0.1',
  emailjsServiceId: import.meta.env['NG_APP_EMAIL_SERVICE_ID'] ?? '',
  emailjsTemplateId: import.meta.env['NG_APP_EMAIL_TEMPLATE_ID'] ?? '',
  emailjsPublicKey: import.meta.env['NG_APP_EMAIL_PUBLIC_KEY'] ?? '',
};
