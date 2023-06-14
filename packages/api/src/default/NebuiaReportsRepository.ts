import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaReportsRepository } from './interfaces/NebuiaReportsRepository';

export class NebuiaReportsApiRepository extends NebuiaApiRepository<NebuiaReportsRepository> {
  override get actions(): ParsedApiMethods<NebuiaReportsRepository> {
    const request = this.request.bind(this);

    return {
      async existReport(arg0) {
        const { report, keys } = arg0;

        return request({
          path: 'services/report',
          method: 'get',
          headers: keys,
          query: { report },
        });
      },
      async generateReport(arg0) {
        const { keys } = arg0;

        return request({
          path: 'services/report',
          method: 'post',
          headers: keys,
        });
      },
      async getPDF(arg0) {
        const { report, keys } = arg0;

        return request({
          path: 'services/report',
          method: 'get',
          headers: keys,
          query: { report },
        });
      },
    };
  }
}
