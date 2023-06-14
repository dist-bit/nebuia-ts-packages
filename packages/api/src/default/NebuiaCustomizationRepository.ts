import { convertKeysToHeaders } from '@nebuia-ts/utils';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaCustomizationRepository } from './interfaces/NebuiaCustomizationRepository';

export class NebuiaCustomizationApiRepository extends NebuiaApiRepository<NebuiaCustomizationRepository> {
  override get actions(): ParsedApiMethods<NebuiaCustomizationRepository> {
    const request = this.request.bind(this);

    return {
      async getCompanyTheme(keys) {
        return request({
          path: 'company/theme',
          method: 'get',
          headers: convertKeysToHeaders(keys),
        });
      },
    };
  }
}
