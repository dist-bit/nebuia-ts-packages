import { NebuiaApiResponse, NebuiaWidgetApiRepository } from '../../api';
import { NebuiaKeys } from '../../models';

export class NebuiaWidget extends NebuiaWidgetApiRepository {
  constructor(baseUrl: string, keys: NebuiaKeys) {
    super(baseUrl);
    this.keys = keys;
  }

  override async createReport(): NebuiaApiResponse<string> {
    const response = await super.createReport();

    if (!response.status) {
      return response;
    }

    this.setReport(response.payload);

    return response;
  }
}
