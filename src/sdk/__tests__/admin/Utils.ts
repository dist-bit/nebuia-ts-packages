/* eslint-disable @typescript-eslint/no-floating-promises */
import { NebuiaApiUrl } from '../../../api/__tests__/auth/login.test';
import { NebuiaReportsUtils } from '../../../sdk';

const nebuia = new NebuiaReportsUtils(NebuiaApiUrl, {
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
});

nebuia.existReport({ report: 'REPORT_ID' }); // Check if the report exists
nebuia.generateReport(); // Generate a new report
nebuia.getPDF({ report: 'REPORT_ID' }); // Get the PDF of the report
