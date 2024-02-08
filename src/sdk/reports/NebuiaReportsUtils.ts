import { NebuiaApiResponse, NebuiaReportsApiRepository } from '../../api';
import { NebuiaKeys, NebuiaReport } from '../../models';

type WithReport<T> = T & { report: string };
export class NebuiaReportsUtils extends NebuiaReportsApiRepository {
  constructor(keys: NebuiaKeys) {
    super();
    this.keys = keys;
  }
}

export class NebuiaReportsUtilsFactory {
  private readonly _classes: Record<string, NebuiaReportsUtils> = {};

  async generateReport(keys: NebuiaKeys): NebuiaApiResponse<string> {
    return this._getReportClass(keys).generateReport();
  }

  async getPDF(
    arg0: WithReport<{ keys: NebuiaKeys }>,
  ): NebuiaApiResponse<ArrayBuffer> {
    return this._getReportClass(arg0.keys).getPDF(arg0);
  }

  async existReport(
    arg0: WithReport<{ keys: NebuiaKeys }>,
  ): NebuiaApiResponse<NebuiaReport> {
    return this._getReportClass(arg0.keys).existReport(arg0);
  }

  async verifyKeys(keys: NebuiaKeys): NebuiaApiResponse<unknown> {
    return this._getReportClass(keys).verifyKeys();
  }

  private _getReportClass(keys: NebuiaKeys): NebuiaReportsUtils {
    const key = JSON.stringify(keys);
    if (!this._classes[key]) {
      this._classes[key] = new NebuiaReportsUtils(keys);
    }

    return this._classes[key] as NebuiaReportsUtils;
  }
}
