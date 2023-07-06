import { NebuiaAdminApiRepository, NebuiaApiResponse } from '@nebuia-ts/api';

import { CommonJwtSdkUtils } from '../common/CommonJwtSdk';
import { Credentials } from '../common/CommonSdk';

export class NebuiaAdmin extends NebuiaAdminApiRepository {
  private readonly _authUtils = new CommonJwtSdkUtils();

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }
}
