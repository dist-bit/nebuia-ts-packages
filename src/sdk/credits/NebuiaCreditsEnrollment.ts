import { NebuiaCreditsEnrollmentRepository } from '../../api';
import { NebuiaKeys } from '../../models';

export class NebuiaCreditsEnrollment extends NebuiaCreditsEnrollmentRepository {
  constructor(keys?: NebuiaKeys, baseUrl?: string, sessionToken?: string) {
    super(baseUrl);
    if (keys) {
      this.keys = keys;
    }
    if (sessionToken) {
      this.sessionToken = sessionToken;
    }
  }
}
