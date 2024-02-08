import { NebuiaSignDocumentsRepository } from '../../api';
import { NebuiaKeys } from '../../models';

export class NebuiaSignDocuments extends NebuiaSignDocumentsRepository {
  init(keys: NebuiaKeys): void {
    this.keys = keys;
  }

  parseToken(signUrl: string): string {
    const token = signUrl.split('token=').pop();

    return token ?? '';
  }
}
