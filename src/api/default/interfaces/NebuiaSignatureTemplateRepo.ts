import { AdvSigTemplateDocument, type IsomorphicBlob } from '../../../models';

export interface NebuiaSignatureTemplateRepo {
  getAdvSigTemplates: () => (AdvSigTemplateDocument & {
    createdAt: string;
    updatedAt: string;
  })[];
  saveAdvSigTemplate: (arg0: {
    template: Omit<AdvSigTemplateDocument, 'id' | 'company'>;
    file: IsomorphicBlob;
  }) => true;
  getAdvSigTemplate: (arg0: { id: string }) => {
    template: AdvSigTemplateDocument;
    file: string;
  };
  getAdvSigTemplateFile: (arg0: { id: string }) => ArrayBuffer;
  createAdvSigByTemplate: (arg0: {
    data: { templateId: string; signers: { email: string; kycId?: string }[] };
  }) => true;
}
