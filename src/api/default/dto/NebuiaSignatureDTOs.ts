import { AdvancedSignType, type IsomorphicBlob } from '../../../models';

export interface CreateAdvancedSignatureDTO {
  signs: AdvancedSignType[];
  requiresKYC: boolean;
  signers: {
    email: string;
    kyc?: string;
  }[];
  name: string;
  description?: string;
  document: IsomorphicBlob;
  graphicSign?: {
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
    email: string;
  }[];
}
