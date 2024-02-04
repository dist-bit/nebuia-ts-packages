import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { IsomorphicFormData } from '../types/FormData';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { NebuiaCreditsEnrollmentRepo } from './interfaces/NebuiaCreditsEnrollmentRepo';

export class NebuiaCreditsEnrollmentRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaCreditsEnrollmentRepo>
{
  private _report: string | null = null;
  constructor(baseUrl?: string) {
    super(baseUrl ?? 'https://api-credits.nebuia.com/api');
  }

  async creditsEnrollmentUploadDocuments(arg0: {
    nss: string;
    files: {
      name: string;
      file: Blob | Buffer;
    }[];
  }): NebuiaApiResponse<{ status: true }> {
    const { nss, files } = arg0;
    const body = new IsomorphicFormData();
    await body.init();
    body.append('nss', nss);
    files.forEach((file) => {
      body.append(file.name, file.file, file.name);
    });

    return this.request({
      ...this.parse('post'),
      path: 'collaborators/onboarding/upload-documents',
      body,
    });
  }

  public getReport(omitError = false): string {
    if (!this._report && !omitError) {
      throw new Error('Report not found');
    }

    return this._report ?? '';
  }

  public setReport(value: string): void {
    this._report = value;
  }

  private parse(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    omitError = false,
  ) {
    const keys = this.keys;
    const report = this.getReport(omitError);

    return {
      method,
      keys,
      query: { report },
    };
  }
}
