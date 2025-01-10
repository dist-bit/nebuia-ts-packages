import type { IsomorphicBlob } from '../../../models';

export interface NebuiaCreditsEnrollmentRepo {
  creditsEnrollmentUploadDocuments(arg0: {
    nss: string;
    files: {
      name: string;
      file: IsomorphicBlob;
    }[];
  }): { status: true };
}
