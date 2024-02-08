/* eslint-disable @typescript-eslint/no-floating-promises */
import { NebuiaReportsUtils } from '../../../sdk';

const nebuia = new NebuiaReportsUtils({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
});

nebuia.existReport({ report: 'REPORT_ID' }); // Check if the report exists
nebuia.generateReport(); // Generate a new report
nebuia.getPDF({ report: 'REPORT_ID' }); // Get the PDF of the report
