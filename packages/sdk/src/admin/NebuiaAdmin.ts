import { NebuiaAdminApiRepository, NebuiaApiResponse } from '@nebuia-ts/api';
import { NebuiaCompany, NebuiaKeys, NebuiaRawKeys } from '@nebuia-ts/models';

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

      return this._getKeys();
    });
  }

  override async getMyCompany(): NebuiaApiResponse<NebuiaCompany> {
    const company = await super.getMyCompany();

    if (!company.status) {
      return company;
    }

    const { payload } = company;
    const parsedKeys = this._parseKeys(payload.keys);
    if (parsedKeys) {
      this._simpleKeys = parsedKeys;
    }

    return company;
  }

  private async _getKeys(): NebuiaApiResponse<NebuiaKeys> {
    if (!this._simpleKeys) {
      return Promise.resolve({
        status: false,
        payload: 'company keys not generated',
      });
    }

    return Promise.resolve({
      status: true,
      payload: this._simpleKeys,
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
