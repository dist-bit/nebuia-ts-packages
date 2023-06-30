import { AdvSigTemplateField } from './AdvSigTemplateField';
import { AdvSigTemplateFieldPlace } from './AdvSigTemplateFieldPlace';

export interface AdvSigTemplateSigner {
  index: number;
  // If document requieres kyc then the signers can fill this fields the kyc data
  // otherwise this property will be ignored
  requiredFields?: AdvSigTemplateField[];
  // If the document requires graphic signature this property must be set
  // otherwise this property will be ignored
  signPlace?: AdvSigTemplateFieldPlace;
}
