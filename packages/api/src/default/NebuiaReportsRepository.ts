import { NebuiaReport } from '@nebuia-ts/models';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { WithReport } from './interfaces/common';
import { NebuiaReportsRepository } from './interfaces/NebuiaReportsRepository';

export class NebuiaReportsApiRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaReportsRepository>
{
  async generateReport(): NebuiaApiResponse<string> {
    const keys = this.keys;

    return this.request({
      path: 'services/report',
      method: 'post',
      keys,
    });
  }

  async existReport(arg0: WithReport): NebuiaApiResponse<NebuiaReport> {
    const { report } = arg0;
    const keys = this.keys;

    return this.request({
      path: 'services/report',
      method: 'get',
      keys,
      query: { report },
    });
  }

  async getPDF(arg0: WithReport): NebuiaApiResponse<ArrayBuffer> {
    const keys = this.keys;
    const { report } = arg0;

    return this.requestFile({
      path: 'services/report',
      method: 'get',
      keys,
      query: { report },
    });
  }
}
