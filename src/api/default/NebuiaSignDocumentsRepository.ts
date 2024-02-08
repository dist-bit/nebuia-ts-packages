import { AdvancedSignType } from '../../models';
import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { NebuiaSignDocumentsRepo } from './interfaces/NebuiaSignDocumentsRepo';

export class NebuiaSignDocumentsRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaSignDocumentsRepo>
{
  constructor(baseUrl = 'https://api.distbit.io/contracts-api') {
    super(baseUrl);
  }

  async getCompanyTemplates(): NebuiaApiResponse<
    {
      id: string;
      name: string;
      description?: string;
      requiresKYC: boolean;
      signsTypes: AdvancedSignType[];
      keysToFill: {
        key: string;
        description?: string;
        place: { x: number; y: number; w: number; h: number; page: number };
        label: string;
      }[];
    }[]
  > {
    return this.request({
      method: 'get',
      path: 'advanced-signature-templates/by/company',
      keys: this.keys,
    });
  }

  async createDocument(arg0: {
    templateId: string;
    email: string;
    kycId?: string;
    sendEmailToUser?: boolean;
  }): NebuiaApiResponse<{ documentId: string; signatureLink: string }> {
    const { email, templateId, kycId, sendEmailToUser } = arg0;

    return this.request({
      method: 'post',
      path: 'advanced-signature/template/by/user',
      keys: this.keys,
      body: {
        templateId,
        email,
        kycId,
        sendEmailToUser: sendEmailToUser ?? true,
      },
    });
  }

  async verifySignStatus(arg0: {
    documentId: string;
  }): NebuiaApiResponse<true> {
    const { documentId } = arg0;

    return this.request({
      method: 'get',
      path: `advanced-signature/document/${documentId}/status`,
      keys: this.keys,
    });
  }

  async getReportDocuments(arg0: { kycId: string }): NebuiaApiResponse<
    {
      templateId?: string;
      documentId: string;
    }[]
  > {
    const { kycId } = arg0;

    return this.request({
      method: 'get',
      path: `advanced-signature/find-open/by/kyc/${kycId}`,
      keys: this.keys,
    });
  }
}
