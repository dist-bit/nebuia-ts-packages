import {
  NebuiaAdminSignatureRepository,
  NebuiaApiResponse,
  NebuiaSignatureTemplateRepository,
} from '../../api';
import { CommonJwtSdkUtils } from '../common/CommonJwtSdk';
import { Credentials } from '../common/CommonSdk';

export class NebuiaAdminSignature extends NebuiaAdminSignatureRepository {
  private readonly _authUtils = new CommonJwtSdkUtils();

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }
}

export class NebuiaAdminSignatureTemplates extends NebuiaSignatureTemplateRepository {
  private readonly _authUtils = new CommonJwtSdkUtils();

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }
}
