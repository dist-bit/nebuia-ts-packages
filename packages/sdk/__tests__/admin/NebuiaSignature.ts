/* eslint-disable @typescript-eslint/no-floating-promises */
import { NebuiaSignature } from '../../src';

const nebuia = new NebuiaSignature();

// PUBLIC METHODS
nebuia.initToken('API_TOKEN'); // Use a token obtained by an email of the signer
nebuia.findDocumentsByEmail({ email: 'SOME_EMAIL' }); // Find documents by email
nebuia.requestEmailVerification({
  documentId: 'DOCUMENT_ID',
  email: 'SOME_EMAIL',
}); // Request a verification code to the signer
nebuia.verifyEmail({
  documentId: 'DOCUMENT_ID',
  email: 'SOME_EMAIL',
  code: 'SOME_CODE',
}); // Verify the email of the signer, if code is valid, the token is setted

// AUTH REQUIRED METHODS
nebuia.getDocumentToSign(); // Get the document info to sign
nebuia.getDocumentFileToSign(); // Get the document file to sign
nebuia.getDocumentBase64FileToSign(); // Get the document file to sign in base64
nebuia.saveGraphSign({ sign: new Blob() }); // Save the graph sign of the signer, if required
nebuia.saveFielSign({
  password: 'SOME_PASSWORD',
  cer: new File([], ''),
  key: new File([], ''),
}); // Save the fiel sign of the signer, if required
