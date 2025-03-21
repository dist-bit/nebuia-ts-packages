import type { IsomorphicBlob } from '../../../models';
import { NebuiaSignerDocument } from '../dto/NebuiaSignerDTO';

export interface NebuiaSignerRepo {
  getDocumentToSign(): NebuiaSignerDocument;

  getDocumentFileToSign(): ArrayBuffer;

  getDocumentBase64FileToSign(): string;

  findDocumentsByEmail(arg0: { email: string }): {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    isFilled: boolean;
    company: {
      name: string;
    };
  }[];

  requestEmailVerification(arg0: {
    email: string;
    documentId: string;
  }): boolean;

  verifyEmail(arg0: {
    email: string;
    documentId: string;
    code: string;
  }): string;

  saveGraphSign(arg0: { sign: IsomorphicBlob }): true;

  saveFielSign(arg0: {
    cer: IsomorphicBlob;
    key: IsomorphicBlob;
    password: string;
  }): true;

  useKyc(arg0: { newKyc: string }): true;
}
