import {
  NebuiaCompany,
  NebuiaCompanyWidgetSettings,
  NebuiaReport,
  NebuiaStepNames,
  ReportValidity,
} from '@nebuia-ts/models';

import {
  CreateNebuiaCompanyDTO,
  GetCompanyReportsDTO,
  RegisterNebuiaUserDTO,
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
  updateCompanyTheme: (arg0: { value: NebuiaCompanyWidgetSettings }) => unknown;
  updateCompanySteps: (arg0: { value: NebuiaStepNames[] }) => unknown;
  invalidateReport: (arg0: WithReport) => unknown;
};
