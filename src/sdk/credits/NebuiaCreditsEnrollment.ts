import { NebuiaCreditsEnrollmentRepository } from '../../api';
import { NebuiaKeys } from '../../models';

export class NebuiaCreditsEnrollment extends NebuiaCreditsEnrollmentRepository {
  constructor(keys: NebuiaKeys, baseUrl?: string) {
    super(baseUrl);
    this.keys = keys;
  }
}
