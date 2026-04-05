// Mock for src/environments/environment — avoids import.meta.env in Jest (CommonJS context)
module.exports = {
  environment: {
    production: false,
    emailjsServiceId: 'test-service-id',
    emailjsTemplateId: 'test-template-id',
    emailjsPublicKey: 'test-public-key',
  },
};
