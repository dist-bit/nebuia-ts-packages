import { AdvSigTemplateFieldPlace } from './AdvSigTemplateFieldPlace';

export const AdvSigTemplateFieldTypes = {
  curp: 'curp',
  address: 'address',
  elector_key: 'elector_key',
  document_number: 'document_number',
  name: 'name',
  email: 'email',
} as const;
export type AdvSigTemplateFieldTypes =
  (typeof AdvSigTemplateFieldTypes)[keyof typeof AdvSigTemplateFieldTypes];

export interface AdvSigTemplateField {
  description?: string;
  fontSize: number;
  place: AdvSigTemplateFieldPlace;
  type: AdvSigTemplateFieldTypes;
}
