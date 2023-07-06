import {
  NebuiaApiResponse,
  NebuiaSignatureRepository,
  NebuiaSignatureTemplateRepository,
} from '@nebuia-ts/api';

import { CommonJwtSdkUtils } from '../common/CommonJwtSdk';
import { Credentials } from '../common/CommonSdk';

export class NebuiaSignature extends NebuiaSignatureRepository {
  private readonly _authUtils = new CommonJwtSdkUtils();

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }
}

export class NebuiaSignatureTemplates extends NebuiaSignatureTemplateRepository {
  private readonly _authUtils = new CommonJwtSdkUtils();

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }
}
