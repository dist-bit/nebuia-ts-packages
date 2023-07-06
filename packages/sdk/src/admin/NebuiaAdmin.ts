import { NebuiaAdminApiRepository } from '@nebuia-ts/api';

import { CommonJwtSdk } from '../common/CommonSdk';

export class NebuiaAdmin extends CommonJwtSdk {
  private readonly _repo: NebuiaAdminApiRepository;

  constructor() {
    super();
    this._repo = new NebuiaAdminApiRepository();
  }

  async actions(): Promise<NebuiaAdminApiRepository> {
    const tokenValidation = await this.verifyToken();
    if (!tokenValidation.status) {
      throw new Error('Invalid token');
    }

    return this._repo;
  }
}
