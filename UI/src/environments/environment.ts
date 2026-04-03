const process = (window as any).process;

export const environment = {
  production: false,
  emailjsServiceId: process?.env['NG_APP_EMAIL_SERVICE_ID'] ?? '',
  emailjsTemplateId: process?.env['NG_APP_EMAIL_TEMPLATE_ID'] ?? '',
  emailjsPublicKey: process?.env['NG_APP_EMAIL_PUBLIC_KEY'] ?? '',
};
