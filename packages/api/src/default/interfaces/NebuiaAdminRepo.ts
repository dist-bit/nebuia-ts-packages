import {
  NebuiaCompany,
  NebuiaCompanySettings,
  NebuiaReport,
  NebuiaStepNames,
  ReportValidity,
} from '@nebuia-ts/models';

import {
  CreateNebuiaCompanyDTO,
  GetCompanyReportsDTO,
  RegisterNebuiaUserDTO,
  UpdateNebuiaCreditDocuments,
} from '../dto/NebuiaAdminDTOs';
import { WithReport } from './common';

export type NebuiaAdminRepository = {
  login: (arg0: { email: string; password: string }) => { token: string };
  createAccount: (arg0: RegisterNebuiaUserDTO) => 'successful operation';
  getMyCompany: () => NebuiaCompany;
  createCompany: (arg0: CreateNebuiaCompanyDTO) => unknown;
  createKeys: () => unknown;
  getReportsByCompany: (
    arg0: GetCompanyReportsDTO,
  ) => (NebuiaReport & { validity: ReportValidity })[] | undefined;
  updateIp: (arg0: { value: string }) => unknown;
  updateOrigin: (arg0: { value: string }) => unknown;
  updateCompanyTheme: (arg0: {
    value: Pick<NebuiaCompanySettings, 'primary_color' | 'secondary_color'>;
  }) => unknown;
  updateCompanySteps: (arg0: { value: NebuiaStepNames[] }) => unknown;
  invalidateReport: (arg0: WithReport) => unknown;
  getReportPdf: (arg0: WithReport) => ArrayBuffer;
  getReportIDImage: (
    arg0: WithReport<{ side: 'back' | 'front' }>,
  ) => ArrayBuffer;
  getReportById: (
    arg0: WithReport,
  ) => NebuiaReport & { validity: ReportValidity };
  getReportFaceImage: (arg0: WithReport) => ArrayBuffer;
  setCompanyLogo: (arg0: Blob | Buffer) => unknown;
  appendCreditProductDocuments: (arg0: UpdateNebuiaCreditDocuments) => unknown;
  removeCreditProductDocument: (arg0: { doc_name: string }) => unknown;
  activateCreditProduct: (arg0: {
    domain: string;
    platform_name: string;
  }) => unknown;
};
