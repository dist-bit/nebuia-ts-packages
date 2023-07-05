import {
  NebuiaCompany,
  NebuiaCompanyWidgetSettings,
  NebuiaReport,
  NebuiaStepNames,
  ReportValidity,
} from '@nebuia-ts/models';
import {
  checkNebuiaReportValidity,
  convertKeysToHeaders,
} from '@nebuia-ts/utils';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import {
  CreateNebuiaCompanyDTO,
  RegisterNebuiaUserDTO,
} from './dto/NebuiaAdminDTOs';
import { WithReport } from './interfaces/common';
import { NebuiaAdminRepository } from './interfaces/NebuiaAdminRepo';

export class NebuiaAdminApiRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaAdminRepository>
{
  async login(arg0: {
    email: string;
    password: string;
  }): NebuiaApiResponse<{ token: string }> {
    const { email, password } = arg0;

    return this.request({
      method: 'post',
      path: 'user/login',
      body: {
        email: { email },
        password,
      },
    });
  }

  async createAccount(
    arg0: RegisterNebuiaUserDTO,
  ): NebuiaApiResponse<'successful operation'> {
    const { email, password, name, lastName } = arg0;

    return this.request({
      method: 'post',
      path: 'user/create',
      body: {
        email: { email },
        password,
        name,
        last_name: lastName,
      },
    });
  }

  async createCompany(
    data: CreateNebuiaCompanyDTO,
  ): NebuiaApiResponse<unknown> {
    const jwt = this.token;
    const { ip, name, origin, steps, widgetDarkMode } = data;

    return this.request({
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
  }

  async createKeys(): NebuiaApiResponse<unknown> {
    const jwt = this.token;

    return this.request({
      path: 'company/keys',
      method: 'get',
      jwt,
    });
  }

  async getMyCompany(): NebuiaApiResponse<NebuiaCompany> {
    const jwt = this.token;

    return this.request({
      path: 'company',
      method: 'get',
      jwt,
    });
  }

  async getReportsByCompany(): NebuiaApiResponse<
    | (NebuiaReport & { validity: 'REJECTED' | 'DANGER' | 'SUCCESS' })[]
    | undefined
  > {
    const keys = this.keys;
    const result = await this.request<
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
      payload: result.payload?.map((report: NebuiaReport) => ({
        ...report,
        validity: checkNebuiaReportValidity(report).status,
      })),
    };
  }

  async invalidateReport(arg0: WithReport): NebuiaApiResponse<unknown> {
    const { report } = arg0;
    const { token: jwt, keys } = this;
    const response = await this.request({
      path: 'services/invalidate',
      method: 'delete',
      query: {
        report,
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
  }

  async updateCompanySteps({
    value,
  }: {
    value: NebuiaStepNames[];
  }): NebuiaApiResponse<unknown> {
    const jwt = this.token;

    return this.request({
      path: 'company/steps',
      method: 'put',
      jwt,
      body: { steps: value },
    });
  }

  async updateCompanyTheme({
    value,
  }: {
    value: NebuiaCompanyWidgetSettings;
  }): NebuiaApiResponse<unknown> {
    const jwt = this.token;

    return this.request({
      path: 'company/theme',
      method: 'put',
      jwt,
      body: value,
    });
  }

  async updateIp({ value }: { value: string }): NebuiaApiResponse<unknown> {
    const jwt = this.token;

    return this.request({
      path: 'company/ip',
      method: 'put',
      jwt,
      body: { ip: value },
    });
  }

  async updateOrigin({ value }: { value: string }): NebuiaApiResponse<unknown> {
    const jwt = this.token;

    return this.request({
      path: 'company/origin',
      method: 'put',
      jwt,
      body: { origin: value },
    });
  }
}
