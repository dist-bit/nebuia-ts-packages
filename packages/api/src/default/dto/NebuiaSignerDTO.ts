import {
  AdvancedSignatureCompany,
  AdvancedSignatureSigner,
  AdvancedSignDocument,
  PartialAdvancedSignerSign,
} from '@nebuia-ts/models';

export interface NebuiaSignerDocument {
  document: AdvancedSignDocument & {
    company: AdvancedSignatureCompany;
  };
  sign: AdvancedSignatureSigner & {
    partialSigns: PartialAdvancedSignerSign[];
  };
}
