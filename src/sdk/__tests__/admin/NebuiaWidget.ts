/* eslint-disable @typescript-eslint/no-floating-promises */
import { NebuiaApiUrl } from '../../../api/__tests__/auth/login.test';
import { NebuiaAddress } from '../../../models';
import { NebuiaWidget } from '../../../sdk';

const nebuia = new NebuiaWidget(NebuiaApiUrl, {
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
