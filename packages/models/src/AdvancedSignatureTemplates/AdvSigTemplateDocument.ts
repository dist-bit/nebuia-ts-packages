import { AdvancedSignType } from '../AdvancedSignature/AdvancedSignatureDocument';
import { AdvSigTemplateDocPagesInfo } from './AdvSigTemplateDocPagesInfo';
import { AdvSigTemplateSigner } from './AdvSigTemplateSigner';

export interface AdvSigTemplateDocument {
  name: string;
  description?: string;
  signsTypes: AdvancedSignType[];
  requiresKYC: boolean;
  signers: AdvSigTemplateSigner[];
  pagesInfo: AdvSigTemplateDocPagesInfo;
  company: string;
}
