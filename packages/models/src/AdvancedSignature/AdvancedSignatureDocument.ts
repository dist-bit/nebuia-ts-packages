// ? New advanced sign model
export const AdvancedSignType = {
  graphic: 'graphic',
  fiel: 'fiel',
  block_chain: 'block_chain',
} as const;
export type AdvancedSignType =
  (typeof AdvancedSignType)[keyof typeof AdvancedSignType];

export interface AdvancedSignDocument {
  id: string;

  name: string;
  description?: string;

  companyId: string;

  isFilled: boolean;

  requiresKYC: boolean;

  signTypes: AdvancedSignType[];

  fielSignature?: unknown;

  createdAt: string;
  updatedAt: string;
  filledAt?: string;
}
