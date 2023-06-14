import { NebuiaReport, ReportValidity } from '@nebuia-ts/models';
import {
  checkNebuiaReportValidity,
  convertKeysToHeaders,
} from '@nebuia-ts/utils';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaAdminRepository } from './interfaces/NebuiaAdminRepo';

export class NebuiaAdminApiRepository extends NebuiaApiRepository<NebuiaAdminRepository> {
  public static i = NebuiaApiRepository.getInstance(NebuiaAdminApiRepository);

  get actions(): ParsedApiMethods<NebuiaAdminRepository> {
    const request = this.request.bind(this);

    return {
      async login(arg0) {
        const { email, password } = arg0;

        return request({
          method: 'post',
          path: 'user/login',
          body: {
            email: { email },
            password,
          },
        });
      },
      async createAccount(arg0) {
        const { email, password, name, lastName } = arg0;

        return request({
          method: 'post',
          path: 'user/create',
          body: {
            email: { email },
            password,
            name,
            last_name: lastName,
          },
        });
      },
      async createCompany(data) {
        const { ip, name, origin, steps, widgetDarkMode, jwt } = data;

        return request({
          path: 'company/create',
          method: 'post',
          jwt,
          body: {
            name,
            ip,
            origin,
            steps,
            settings: { widget: { dark_mode: widgetDarkMode } },
          },
        });
      },
      async createKeys({ jwt }) {
        return request({
          path: 'company/keys',
          method: 'get',
          jwt,
        });
      },
      async getMyCompany({ jwt }) {
        return request({
          path: 'company/',
          method: 'get',
          jwt,
        });
      },
      async getReportsByCompany({ keys, pagination: _ }) {
        const result = await request<
          (NebuiaReport & { validity: ReportValidity })[] | undefined
        >({
          path: 'services/reports',
          method: 'get',
          headers: convertKeysToHeaders(keys),
        });
        if (!result.status) {
          return result;
        }

        return {
          status: true,
          payload: result.payload?.map((report) => ({
            ...report,
            validity: checkNebuiaReportValidity(report).status,
          })),
        };
      },
      async invalidateReport(arg0) {
        const { keys, reportId, jwt } = arg0;

        const response = await request({
          path: 'services/invalidate',
          method: 'delete',
          query: {
            report: reportId,
          },
          jwt,
          headers: convertKeysToHeaders(keys),
        });
        if (response.status) {
          return {
            status: true,
            payload: 'Report invalidated successfully',
          };
        }

        return response;
      },
      async updateCompanySteps({ jwt, value }) {
        return request({
          path: 'company/steps',
          method: 'put',
          jwt,
          body: { steps: value },
        });
      },
      async updateCompanyTheme({ jwt, value }) {
        return request({
          path: 'company/theme',
          method: 'put',
          jwt,
          body: value,
        });
      },
      async updateIp({ jwt, value }) {
        return request({
          path: 'company/ip',
          method: 'put',
          jwt,
          body: { ip: value },
        });
      },
      async updateOrigin({ jwt, value }) {
        return request({
          path: 'company/origin',
          method: 'put',
          jwt,
          body: { origin: value },
        });
      },
    };
  }
}
