import {
  convertKeysToHeaders,
  NebuiaCompanyWidgetSettings,
} from '@nebuia-ts/models';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { NebuiaCustomizationRepository } from './interfaces/NebuiaCustomizationRepository';

export class NebuiaCustomizationApiRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaCustomizationRepository>
{
  async getCompanyTheme(): NebuiaApiResponse<NebuiaCompanyWidgetSettings> {
    const keys = this.keys;

    return this.request({
      path: 'company/theme',
      method: 'get',
      headers: convertKeysToHeaders(keys),
    });
  }
}
