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
import { WithKeys, WithToken } from './common';

export type NebuiaAdminRepository = {
  login: (arg0: { email: string; password: string }) => { token: string };
  createAccount: (arg0: RegisterNebuiaUserDTO) => 'successful operation';
  getMyCompany: (arg0: WithToken) => NebuiaCompany;
  createCompany: (arg0: WithToken<CreateNebuiaCompanyDTO>) => unknown;
  createKeys: (arg0: WithToken) => unknown;
  getReportsByCompany: (
    arg0: WithKeys<GetCompanyReportsDTO>,
  ) => (NebuiaReport & { validity: ReportValidity })[] | undefined;
  updateIp: (arg0: WithToken<{ value: string }>) => unknown;
  updateOrigin: (arg0: WithToken<{ value: string }>) => unknown;
  updateCompanyTheme: (
    arg0: WithToken<{ value: NebuiaCompanyWidgetSettings }>,
  ) => unknown;
  updateCompanySteps: (
    arg0: WithToken<{ value: NebuiaStepNames[] }>,
  ) => unknown;
  invalidateReport: (
    arg0: WithToken<WithKeys<{ reportId: string }>>,
  ) => unknown;
};
