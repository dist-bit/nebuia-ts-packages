import {
  NebuiaCompany,
  NebuiaCompanyWidgetSettings,
  NebuiaKeys,
  NebuiaReport,
  NebuiaStepNames,
  ReportValidity,
} from '@nebuia-ts/models';

import {
  CreateNebuiaCompanyDTO,
  GetCompanyReportsDTO,
  RegisterNebuiaUserDTO,
} from '../dto/NebuiaAdminDTOs';

type WithJWT<T = object> = T & { jwt: string };
type WithKeys<T = object> = T & { keys: NebuiaKeys };

export type NebuiaAdminRepository = {
  login: (arg0: { email: string; password: string }) => { token: string };
  createAccount: (arg0: RegisterNebuiaUserDTO) => 'successful operation';
  getMyCompany: (arg0: WithJWT) => NebuiaCompany;
  createCompany: (arg0: WithJWT<CreateNebuiaCompanyDTO>) => unknown;
  createKeys: (arg0: WithJWT) => unknown;
  getReportsByCompany: (
    arg0: WithKeys<GetCompanyReportsDTO>,
  ) => (NebuiaReport & { validity: ReportValidity })[] | undefined;
  updateIp: (arg0: WithJWT<{ value: string }>) => unknown;
  updateOrigin: (arg0: WithJWT<{ value: string }>) => unknown;
  updateCompanyTheme: (
    arg0: WithJWT<{ value: NebuiaCompanyWidgetSettings }>,
  ) => unknown;
  updateCompanySteps: (arg0: WithJWT<{ value: NebuiaStepNames[] }>) => unknown;
  invalidateReport: (arg0: WithJWT<WithKeys<{ reportId: string }>>) => unknown;
};
