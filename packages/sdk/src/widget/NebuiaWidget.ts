import { NebuiaWidgetApiRepository } from '@nebuia-ts/api';
import { NebuiaKeys } from '@nebuia-ts/models';

import { CommonSdk } from '../common/CommonSdk';

export class NebuiaWidget extends CommonSdk {
  private readonly _repo: NebuiaWidgetApiRepository;
  constructor(keys: NebuiaKeys) {
    super();
    this._repo = new NebuiaWidgetApiRepository();
    this._repo.keys = keys;
  }

  set report(value: string) {
    this._repo.report = value;
  }

  get actions(): NebuiaWidgetApiRepository {
    return this._repo;
  }
}
