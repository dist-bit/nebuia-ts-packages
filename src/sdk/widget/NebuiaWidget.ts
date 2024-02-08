import { NebuiaApiResponse, NebuiaWidgetApiRepository } from '../../api';
import { NebuiaKeys } from '../../models';

export class NebuiaWidget extends NebuiaWidgetApiRepository {
  constructor(keys: NebuiaKeys) {
    super();
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
