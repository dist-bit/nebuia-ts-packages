/* eslint-disable @typescript-eslint/no-floating-promises */
import { NebuiaApiUrl } from '../../../api/__tests__/auth/login.test';
import { NebuiaAdminSignatureTemplates } from '../../../sdk';

const nebuia = new NebuiaAdminSignatureTemplates(NebuiaApiUrl);

// PUBLIC METHODS
nebuia.init({
  email: 'YOUR_EMAIL',
  password: 'YOUR_PASSWORD',
}); // Returns the token and use it for next steps, including the refresh token

// AUTH REQUIRED METHODS
// @ts-expect-error - So many parameters
nebuia.saveAdvSigTemplate({}); // Create a template for signature, preferred to use the admin panel
nebuia.getAdvSigTemplates(); // Get your templates for signature
nebuia.getAdvSigTemplate({ id: 'TEMPLATE_ID' }); // Get the template details
nebuia.getAdvSigTemplateFile({ id: 'TEMPLATE_ID' }); // Get the template file
nebuia.createAdvSigByTemplate({
  data: {
    templateId: 'TEMPLATE_ID',
    signers: [
      {
        email: 'email',
        kycId: 'kycId',
      },
      {
        email: 'email',
      },
    ],
  },
}); // Create a document to sign from a template, if the document requires KYC, the kycId could be used
