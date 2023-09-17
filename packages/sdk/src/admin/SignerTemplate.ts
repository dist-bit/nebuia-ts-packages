import { NebuiaSignDocumentsRepository } from '@nebuia-ts/api';
import { NebuiaKeys } from '@nebuia-ts/models';

export class NebuiaSignDocuments extends NebuiaSignDocumentsRepository {
  init(keys: NebuiaKeys): void {
    this.keys = keys;
  }

  parseToken(signUrl: string): string {
    const token = signUrl.split('token=').pop();

    return token ?? '';
  }
}
