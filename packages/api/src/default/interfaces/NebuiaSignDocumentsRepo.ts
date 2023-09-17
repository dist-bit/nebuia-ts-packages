import { AdvancedSignType } from '@nebuia-ts/models';

export interface NebuiaSignDocumentsRepo {
  getCompanyTemplates(): {
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
  }[];
  createDocument(arg0: {
    templateId: string;
    email: string;
    kycId?: string;
    sendEmailToUser?: boolean;
  }): {
    documentId: string;
    signatureLink: string;
  };

  verifySignStatus(arg0: { documentId: string }): true;

  getReportDocuments(arg0: { kycId: string }): {
    templateId?: string;
    documentId: string;
  }[];
}
