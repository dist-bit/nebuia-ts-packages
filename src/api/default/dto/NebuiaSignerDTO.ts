import {
  AdvancedSignatureCompany,
  AdvancedSignatureSigner,
  AdvancedSignDocument,
  PartialAdvancedSignerSign,
} from '../../../models';

export interface NebuiaSignerDocument {
  document: AdvancedSignDocument & {
    company: AdvancedSignatureCompany;
  };
  sign: AdvancedSignatureSigner & {
    partialSigns: PartialAdvancedSignerSign[];
  };
}
