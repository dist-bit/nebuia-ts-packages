export interface NebuiaCreditsEnrollmentRepo {
  creditsEnrollmentUploadDocuments(arg0: {
    nss: string;
    files: {
      name: string;
      file: Buffer | Blob;
    }[];
  }): { status: true };
}
