import { NebuiaReportsApiRepository } from '@nebuia-ts/api';
import { NebuiaKeys } from '@nebuia-ts/models';

export class NebuiaReportsUtils extends NebuiaReportsApiRepository {
  constructor(keys: NebuiaKeys) {
    super();
    this.keys = keys;
  }
}
