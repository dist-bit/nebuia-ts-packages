import {
  AdvancedSignatureSigner,
  AdvancedSignCompany,
  AdvancedSignDocument,
  PartialAdvancedSignerSign,
} from '@nebuia-ts/models';

import { CreateAdvancedSignatureDTO } from '../dto/NebuiaSignatureDTOs';

export interface NebuiaSignatureRepo {
  createAdvancedSignature: (arg0: CreateAdvancedSignatureDTO) => true;
  /// signers
  getAdvancedSignatureDocumentToSign: () => {
    document: AdvancedSignDocument & {
      company: AdvancedSignCompany;
    };
    sign: AdvancedSignatureSigner & {
      partialSigns: PartialAdvancedSignerSign[];
    };
  };
  getAdvancedSignatureDocumentFileToSign(): ArrayBuffer;

  getAdvancedSignatureDocumentBase64FileToSign(): string;

  getMyAdvancedSignatureDocuments(): AdvancedSignDocument[];

  downloadOwnAdvancedSignatureDocumentFile(arg0: { id: string }): ArrayBuffer;

  downloadOwnFilledAdvancedSignatureDocumentFile(arg0: {
    id: string;
  }): ArrayBuffer;

  findAdvancedSignaturesByEmail(arg0: { email: string }): {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    isFilled: boolean;
    company: {
      name: string;
    };
  }[];

  requestAdvancedSignatureEmailVerification(arg0: {
    email: string;
    documentId: string;
  }): boolean;

  verifyAdvancedSignatureEmail(arg0: {
    email: string;
    documentId: string;
    code: string;
  }): string;

  saveAdvancedSignatureGraphSign(arg0: { sign: Blob }): true;

  saveAdvancedSignatureFielSign(arg0: {
    cer: File;
    key: File;
    password: string;
  }): true;

  getMyStatistics(): {
    totalDocs: number;
    totalTemplates: number;
  };

  getAdvancedSignatureDetails(arg0: { id: string }): AdvancedSignDocument & {
    signs: AdvancedSignatureSigner[];
  };
}
