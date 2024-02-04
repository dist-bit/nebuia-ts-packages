import { NebuiaCreditsEnrollmentRepository } from '@nebuia-ts/api';
import { NebuiaKeys } from '@nebuia-ts/models';

export class NebuiaCreditsEnrollment extends NebuiaCreditsEnrollmentRepository {
  constructor(keys: NebuiaKeys, baseUrl?: string) {
    super(baseUrl);
    this.keys = keys;
  }
}
