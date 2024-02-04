export interface NebuiaCreditsEnrollmentRepo {
  creditsEnrollmentUploadDocuments(arg0: {
    nss: string;
    files: {
      name: string;
      file: string;
      type: 'application/pdf' | 'image/png' | 'image/jpeg';
    }[];
  }): { status: true };
}
