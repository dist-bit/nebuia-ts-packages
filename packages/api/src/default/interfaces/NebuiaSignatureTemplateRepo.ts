import { AdvSigTemplateDocument } from '@nebuia-ts/models';

export interface NebuiaSignatureTemplateRepo {
  getAdvSigTemplates: (arg0: { jwt: string }) => (AdvSigTemplateDocument & {
    createdAt: string;
    updatedAt: string;
  })[];
  saveAdvSigTemplate: (arg0: {
    jwt: string;
    template: Omit<AdvSigTemplateDocument, 'id' | 'company'>;
    file: File;
  }) => true;
  getAdvSigTemplate: (arg0: { id: string; jwt: string }) => {
    template: AdvSigTemplateDocument;
    file: string;
  };
  getAdvSigTemplateFile: (arg0: { id: string; jwt: string }) => ArrayBuffer;
  createAdvSigByTemplate: (arg0: {
    data: { templateId: string; signers: { email: string; kycId?: string }[] };
    jwt: string;
  }) => true;
}
