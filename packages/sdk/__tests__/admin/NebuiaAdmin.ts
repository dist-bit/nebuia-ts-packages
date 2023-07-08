/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  CreateNebuiaCompanyDTO,
  RegisterNebuiaUserDTO,
} from '@nebuia-ts/api/dist/esm/default/dto/NebuiaAdminDTOs';

import { NebuiaAdmin } from '../../src';

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
