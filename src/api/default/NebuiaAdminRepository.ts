import {
  checkNebuiaReportValidity,
  NebuiaCompany,
  NebuiaCompanySettings,
  NebuiaReport,
  NebuiaStepNames,
  ReportValidity,
} from '../../models';
import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { IsomorphicFormData } from '../types/FormData';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import {
  CreateNebuiaCompanyDTO,
  RegisterNebuiaUserDTO,
  UpdateNebuiaCreditDocuments,
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
      path: 'company/',
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
      keys,
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
      keys,
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
    value: Pick<NebuiaCompanySettings, 'primary_color' | 'secondary_color'>;
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

  async getReportPdf({
    report,
  }: {
    report: string;
  }): NebuiaApiResponse<ArrayBuffer> {
    const keys = this.keys;

    return this.requestFile({
      method: 'get',
      path: 'services/pdf',
      query: { report },
      keys,
    });
  }

  async getReportIDImage({
    report,
    side,
  }: {
    report: string;
    side: 'back' | 'front';
  }): NebuiaApiResponse<ArrayBuffer> {
    const keys = this.keys;

    return this.requestFile({
      method: 'get',
      path: `services/docs/${side}`,
      keys,
      query: { report, side },
    });
  }

  async getReportFaceImage({
    report,
  }: {
    report: string;
  }): NebuiaApiResponse<ArrayBuffer> {
    const keys = this.keys;

    return this.requestFile({
      method: 'get',
      path: 'services/face',
      keys,
      query: { report },
    });
  }

  async getReportById({
    report,
  }: {
    report: string;
  }): NebuiaApiResponse<NebuiaReport & { validity: ReportValidity }> {
    const keys = this.keys;

    const response = await this.request<NebuiaReport>({
      method: 'get',
      path: 'services/report',
      keys,
      query: { report },
    });
    if (!response.status) {
      return response;
    }

    return {
      status: true,
      payload: {
        ...response.payload,
        validity: checkNebuiaReportValidity(response.payload).status,
      },
    };
  }

  async setCompanyLogo(arg0: Blob | Buffer): NebuiaApiResponse<unknown> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('logo', arg0, 'logo.png');
    const response = await this.request({
      method: 'put',
      path: 'company/logo',
      body,
      jwt: this.token,
    });

    return response;
  }

  async appendCreditProductDocuments(
    data: UpdateNebuiaCreditDocuments,
  ): NebuiaApiResponse<unknown> {
    return this.request({
      method: 'put',
      path: 'company/credit/append/collaborator/document',
      jwt: this.token,
      body: {
        documents_config: data.docs,
      },
    });
  }

  async removeCreditProductDocument(arg0: {
    doc_name: string;
  }): NebuiaApiResponse<unknown> {
    return this.request({
      method: 'delete',
      path: `company/credit/remove/collaborator/${arg0.doc_name}`,
      jwt: this.token,
    });
  }

  async activateCreditProduct({
    domain,
    platform_name: platformName,
  }: {
    domain: string;
    platform_name: string;
  }): NebuiaApiResponse<unknown> {
    return this.request({
      method: 'post',
      path: 'company/credit',
      jwt: this.token,
      body: {
        domain,
        platform_name: platformName,
      },
    });
  }
}
