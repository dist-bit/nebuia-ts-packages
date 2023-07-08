/* eslint-disable @typescript-eslint/no-floating-promises */
import { NebuiaAdminSignature } from '../../src';

const nebuia = new NebuiaAdminSignature();

// PUBLIC METHODS
nebuia.init({
  email: 'YOUR_EMAIL',
  password: 'YOUR_PASSWORD',
}); // Returns the token and use it for next steps, including the refresh token

// AUTH REQUIRED METHODS
nebuia.createAdvancedSignature({
  signs: [],
  requiresKYC: false,
  emails: [],
  name: '',
  document: new Blob(),
}); // Create a document to sign, preferred to use the admin panel
nebuia.getMyAdvancedSignatureDocuments(); // Get the company documents and some info
nebuia.getAdvancedSignatureDetails({
  id: 'DOCUMENT_ID',
}); // Get the document details
nebuia.downloadOwnAdvancedSignatureDocumentFile({
  id: 'DOCUMENT_ID',
}); // Download de document file
nebuia.downloadOwnFilledAdvancedSignatureDocumentFile({
  id: 'DOCUMENT_ID',
}); // Download de document file filled
