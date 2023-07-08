import {
  AdvancedSignatureSigner,
  AdvancedSignDocument,
} from '@nebuia-ts/models';

import { CreateAdvancedSignatureDTO } from '../dto/NebuiaSignatureDTOs';

export interface NebuiaSignatureRepo {
  createAdvancedSignature: (arg0: CreateAdvancedSignatureDTO) => true;

  downloadOwnAdvancedSignatureDocumentFile(arg0: { id: string }): ArrayBuffer;

  downloadOwnFilledAdvancedSignatureDocumentFile(arg0: {
    id: string;
  }): ArrayBuffer;

  getMyAdvancedSignatureDocuments(): AdvancedSignDocument[];

  getMyStatistics(): {
    totalDocs: number;
    totalTemplates: number;
  };

  getAdvancedSignatureDetails(arg0: { id: string }): AdvancedSignDocument & {
    signs: AdvancedSignatureSigner[];
  };
}
