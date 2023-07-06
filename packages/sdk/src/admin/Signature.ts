import {
  NebuiaSignatureRepository,
  NebuiaSignatureTemplateRepository,
} from '@nebuia-ts/api';

import { CommonJwtSdk } from '../common/CommonSdk';

export class NebuiaSignatureAdmin extends CommonJwtSdk {
  private readonly _repo: NebuiaSignatureRepository;
  private readonly _template: NebuiaSignatureTemplateRepository;

  constructor() {
    super();
    this._repo = new NebuiaSignatureRepository();
    this._template = new NebuiaSignatureTemplateRepository();
  }

  async actions(): Promise<NebuiaSignatureRepository> {
    const tokenValidation = await this.verifyToken();
    if (!tokenValidation.status) {
      throw new Error('Invalid token');
    }

    return this._repo;
  }

  async templates(): Promise<NebuiaSignatureTemplateRepository> {
    const tokenValidation = await this.verifyToken();
    if (!tokenValidation.status) {
      throw new Error('Invalid token');
    }

    return this._template;
  }
}
