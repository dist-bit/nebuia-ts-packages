import { NebuiaApiResponse, NebuiaWidgetApiRepository } from '../../api';
import { NebuiaCreateReportOptions, NebuiaKeys } from '../../models';

export class NebuiaWidget extends NebuiaWidgetApiRepository {
  constructor(baseUrl: string, keys?: NebuiaKeys, sessionToken?: string) {
    super(baseUrl);
    if (keys) {
      this.keys = keys;
    }
    if (sessionToken) {
      this.sessionToken = sessionToken;
    }
  }

  override async createReport(
    arg0?: NebuiaCreateReportOptions,
  ): NebuiaApiResponse<string> {
    const response = await super.createReport(arg0);

    if (!response.status) {
      return response;
    }

    this.setReport(response.payload);

    return response;
  }
}
