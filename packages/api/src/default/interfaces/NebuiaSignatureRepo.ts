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
  getAdvancedSignatureDocumentToSign: (arg0: { jwt: string }) => {
    document: AdvancedSignDocument & {
      company: AdvancedSignCompany;
    };
    sign: AdvancedSignatureSigner & {
      partialSigns: PartialAdvancedSignerSign[];
    };
  };
  getAdvancedSignatureDocumentFileToSign(arg0: { jwt: string }): ArrayBuffer;

  getAdvancedSignatureDocumentBase64FileToSign(arg0: { jwt: string }): string;

  getMyAdvancedSignatureDocuments(arg0: {
    jwt: string;
  }): AdvancedSignDocument[];

  downloadOwnAdvancedSignatureDocumentFile(arg0: {
    jwt: string;
    id: string;
  }): ArrayBuffer;

  downloadOwnFilledAdvancedSignatureDocumentFile(arg0: {
    jwt: string;
    id: string;
  }): ArrayBuffer;

  findAdvancedSignaturesByEmail({ email }: { email: string }): {
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

  saveAdvancedSignatureGraphSign(arg0: { jwt: string; sign: Blob }): true;

  saveAdvancedSignatureFielSign(arg0: {
    jwt: string;
    cer: File;
    key: File;
    password: string;
  }): true;

  getMyStatistics(arg0: { jwt: string }): {
    totalDocs: number;
    totalTemplates: number;
  };

  getAdvancedSignatureDetails(arg0: {
    jwt: string;
    id: string;
  }): AdvancedSignDocument & {
    signs: AdvancedSignatureSigner[];
  };
}
