import {
  NebuiaAdminSignatureRepository,
  NebuiaApiResponse,
  NebuiaSignatureTemplateRepository,
} from '../../api';
import { CommonJwtSdkUtils } from '../common/CommonJwtSdk';
import { Credentials } from '../common/CommonSdk';
import type { CredentialsStore } from './CredentialsStore';

export class NebuiaAdminSignature extends NebuiaAdminSignatureRepository {
  private readonly _authUtils;

  constructor({
    baseUrl,
    credentialsStore,
  }: {
    baseUrl?: string;
    credentialsStore?: CredentialsStore;
  } = {}) {
    super(baseUrl);
    this._authUtils = new CommonJwtSdkUtils(credentialsStore);
  }

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }
}

export class NebuiaAdminSignatureTemplates extends NebuiaSignatureTemplateRepository {
  private readonly _authUtils;

  constructor({
    baseUrl,
    credentialsStore,
  }: {
    baseUrl?: string;
    credentialsStore?: CredentialsStore;
  } = {}) {
    super(baseUrl);
    this._authUtils = new CommonJwtSdkUtils(credentialsStore);
  }

  async init(credentials: Credentials): NebuiaApiResponse<string> {
    return this._authUtils.login(credentials);
  }

  override get token(): NebuiaApiResponse<string> {
    return this._authUtils.verifyToken();
  }
}
