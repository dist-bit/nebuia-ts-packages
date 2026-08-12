import { NebuiaApiResponse, NebuiaReportsApiRepository } from '../../api';
import {
  NebuiaCreateReportOptions,
  NebuiaKeys,
  NebuiaReport,
} from '../../models';

type WithReport<T> = T & { report: string };
export class NebuiaReportsUtils extends NebuiaReportsApiRepository {
  constructor(baseUrl: string, keys?: NebuiaKeys, sessionToken?: string) {
    super(baseUrl);
    if (keys) {
      this.keys = keys;
    }
    if (sessionToken) {
      this.sessionToken = sessionToken;
    }
  }
}

export class NebuiaReportsUtilsFactory {
  private readonly _classes: Record<string, NebuiaReportsUtils> = {};

  constructor(private readonly baseUrl: string) {}

  async generateReport(
    keys: NebuiaKeys,
    options?: NebuiaCreateReportOptions,
  ): NebuiaApiResponse<string> {
    return this._getReportClass(keys).generateReport(options);
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

  getSessionTokenInstance(sessionToken: string): NebuiaReportsUtils {
    const key = `session:${sessionToken}`;
    if (!this._classes[key]) {
      this._classes[key] = new NebuiaReportsUtils(
        this.baseUrl,
        undefined,
        sessionToken,
      );
    }

    return this._classes[key];
  }

  private _getReportClass(keys: NebuiaKeys): NebuiaReportsUtils {
    const key = JSON.stringify(keys);
    if (!this._classes[key]) {
      this._classes[key] = new NebuiaReportsUtils(this.baseUrl, keys);
    }

    return this._classes[key];
  }
}
