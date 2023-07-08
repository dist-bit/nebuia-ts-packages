import { NebuiaAdminApiRepository, NebuiaApiResponse } from '@nebuia-ts/api';
import { NebuiaKeys, NebuiaRawKeys } from '@nebuia-ts/models';

import { CommonJwtSdkUtils } from '../common/CommonJwtSdk';
import { Credentials } from '../common/CommonSdk';

export class NebuiaAdmin extends NebuiaAdminApiRepository {
  private readonly _authUtils = new CommonJwtSdkUtils();
  private _simpleKeys: NebuiaKeys | null = null;

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }

  override get keys(): NebuiaApiResponse<NebuiaKeys> {
    if (this._simpleKeys) {
      return Promise.resolve({
        status: true,
        payload: this._simpleKeys,
      });
    }

    return this.getMyCompany().then((company) => {
      if (!company.status) {
        return company;
      }

      const { payload } = company;
      const parsedKeys = this._parseKeys(payload.keys);

      if (!parsedKeys) {
        return {
          status: false,
          payload: 'Keys not found',
        };
      }

      this._simpleKeys = parsedKeys;

      return {
        status: true,
        payload: parsedKeys,
      };
    });
  }

  private _parseKeys(keys?: NebuiaRawKeys): NebuiaKeys | null {
    if (!keys) {
      return null;
    }

    const { public_key: apiKey, secret_key: apiSecret } = keys;
    if (!apiKey || !apiSecret) {
      return null;
    }

    return {
      apiKey,
      apiSecret,
    };
  }
}
