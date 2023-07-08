# @nebuia-ts/sdk

Nebuia SDK for Typescript

This package is part of the [Nebuia](https://nebuia.com) organization.

## Installation

```bash
npm install @nebuia-ts/sdk
```

## Usage

All async operations return the same type of object in a promise:

```typescript
type Response<T> = {
  status: true,
  payload: T,
} | {
  status: false,
  payload: string,
};
```

This helps to handle errors in a more consistent way.

```typescript
const response: Response<object> = await nebuia.someOperation();
if(!response.status) {
  console.log(response.payload); // payload contains the error message
} else {
  console.log(response.payload); // payload contains the object response
}
```

This packages contains the following modules divided by their application context:

### Nebuia Widget

Contains the operations to interact with the KYC process of Nebuia.

```typescript
import { NebuiaAddress } from '@nebuia-ts/models';
import { NebuiaWidget } from '@nebuia-ts/sdk';

const nebuia = new NebuiaWidget

const nebuia = new NebuiaWidget({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
});

nebuia.setReport('REPORT_ID'); // Use an existing report
nebuia.createReport(); // Returns the report number and use it for next steps, similar to setReport

nebuia.getStepsCompany(); // Get the steps of the KYC defined by your company
nebuia.getStepsFromReport(); // Get the steps of the KYC and the status of each step

nebuia.analiceFace(new Blob()); // Returns the score and status of the face
nebuia.qualityFace(new Blob()); // Returns the quality of the face
nebuia.analiceID(new Blob()); // Returns the image of the ID
nebuia.uploadID({
  images: [new Blob(), new Blob()], // Array of cropped images
  name: 'id', // Name of the document
}); // Upload the ID
nebuia.saveEmail('client email'); // Save the email of the client
nebuia.savePhoneNumber('client phone'); // Save the phone of the client
nebuia.saveEmailPhone({
  value: 'client phone or email',
  toEmail: true, // If the value is an email or phone
}); // Save the email or phone of the client
nebuia.generateOTPCode({
  toEmail: true, // If the code is sent to email or phone
}); // Generate a OTP code
nebuia.checkAuthCode('code'); // Check if the code is valid
nebuia.getAddress({
  img: new Blob(), // Image or pdf of the address
  isPDF: false, // If the image is a pdf
}); // Returns the address obtained from the image
nebuia.saveAddress({} as NebuiaAddress); // Save the address of the client
nebuia.getCompanyTheme(); // Get the theme of the company, as colors, and if is dark mode
```

### Nebuia Admin

This module contains to manage the reports and the company settings.

```typescript
import { NebuiaAdmin } from '@nebuia-ts/sdk';

const nebuia = new NebuiaAdmin();

// PUBLIC METHODS
nebuia.createAccount({} as RegisterNebuiaUserDTO); // Create an account for a new user
nebuia.init({
  email: 'YOUR_EMAIL',
  password: 'YOUR_PASSWORD',
}); // Returns the token and use it for next steps, including the refresh token

// AUTH REQUIRED METHODS
nebuia.createCompany({} as CreateNebuiaCompanyDTO); // Create a company for this user
nebuia.createKeys(); // Create the keys for the company, this keys are used to use the widget, could be generated only once
nebuia.getMyCompany(); // Get the company of the user and init the keys if already exists
nebuia.invalidateReport({ report: 'REPORT_ID' }); // Delete a report
nebuia.updateCompanySteps({
  value: ['email', 'id'],
}); // Define the steps of the KYC for the company, by default is all steps
nebuia.updateCompanyTheme({
  value: {
    dark_mode: false,
    primary_color: '#6847a2',
    secondary_color: '#050217',
  },
}); // Define the theme of the company, to use in the widget and the admin panel
nebuia.updateIp({ value: 'SOME_IP' }); // Define the ip of the company, to be restricted in the widget
nebuia.updateOrigin({ value: 'SOME_ORIGIN' }); // Define the origin of the company, to be restricted in the widget
// KEYS REQUIRED METHODS
nebuia.getReportById({ report: 'REPORT_ID' }); // Get the report by id
nebuia.getReportsByCompany(); // Get the reports of the company
nebuia.getReportFaceImage({ report: 'REPORT_ID' }); // Get the face image of the report
nebuia.getReportIDImage({ report: 'REPORT_ID', side: 'front' }); // Get the ID image of the report
nebuia.getReportPdf({ report: 'REPORT_ID' }); // Get the pdf summary of the report
```

### Nebuia Signature Admin

```typescript
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NebuiaAdminSignature } from '@nebuia-ts/sdk';

const nebuia = new NebuiaAdminSignature();

// PUBLIC METHODS
nebuia.init({
  email: 'YOUR_EMAIL',
  password: 'YOUR_PASSWORD',
}); // Returns the token and use it for next steps, including the refresh token

// AUTH REQUIRED METHODS
nebuia.createAdvancedSignature({}); // Create a document to sign, preferred to use the admin panel
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
```

### Nebuia Signature Template Admin

Some of this methods will be renamed in the future.

```typescript
import { NebuiaAdminSignatureTemplates } from '../../src';

const nebuia = new NebuiaAdminSignatureTemplates();

// PUBLIC METHODS
nebuia.init({
  email: 'YOUR_EMAIL',
  password: 'YOUR_PASSWORD',
}); // Returns the token and use it for next steps, including the refresh token

// AUTH REQUIRED METHODS
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
```

### Nebuia Signature

Operations to sign documents, used by clients

```typescript
import { NebuiaSignature } from '@nebuia-ts/sdk';

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
```

### Nebuia Utils

Some utilities to use in client or apis

```typescript
import { NebuiaReportsUtils } from '@nebuia-ts/sdk';

const nebuia = new NebuiaReportsUtils({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
});

nebuia.existReport({ report: 'REPORT_ID' }); // Check if the report exists
nebuia.generateReport(); // Generate a new report
nebuia.getPDF({ report: 'REPORT_ID' }); // Get the PDF of the report
```
