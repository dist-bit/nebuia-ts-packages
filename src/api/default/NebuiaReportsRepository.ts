import { NebuiaCreateReportOptions, NebuiaReport } from '../../models';
import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { parseCreateReportOptions } from './common/createReportOptions';
import { WithReport, WithRfc } from './interfaces/common';
import { NebuiaReportsRepository } from './interfaces/NebuiaReportsRepository';

export class NebuiaReportsApiRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaReportsRepository>
{
  async generateReport(
    arg0?: NebuiaCreateReportOptions,
  ): NebuiaApiResponse<string> {
    const body = parseCreateReportOptions(arg0);

    return this.request({
      ...this.parse('post'),
      path: 'services/report',
      ...(body ? { body } : {}),
    });
  }

  async existReport(arg0: WithReport): NebuiaApiResponse<NebuiaReport> {
    const { report } = arg0;

    return this.request({
      ...this.parse('get'),
      path: 'services/report',
      ...(this.sessionToken ? {} : { query: { report } }),
    });
  }

  async getPDF(arg0: WithReport): NebuiaApiResponse<ArrayBuffer> {
    const { report } = arg0;

    return this.requestFile({
      ...this.parse('get'),
      path: 'services/pdf',
      ...(this.sessionToken ? {} : { query: { report } }),
    });
  }

  async verifyKeys(): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse('get'),
      path: 'services/keys/valid',
    });
  }

  async updateRfc(arg0: WithReport<WithRfc>): NebuiaApiResponse<unknown> {
    const { report, rfc } = arg0;

    return this.request({
      ...this.parse('put'),
      path: 'services/rfc',
      ...(this.sessionToken ? {} : { query: { report } }),
      body: { rfc },
    });
  }

  private parse(method: 'get' | 'post' | 'put' | 'delete' | 'patch') {
    if (this.sessionToken) {
      return { method, sessionToken: this.sessionToken };
    }

    return { method, keys: this.keys };
  }
}
