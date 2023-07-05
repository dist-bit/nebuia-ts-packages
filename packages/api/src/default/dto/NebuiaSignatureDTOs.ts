import { AdvancedSignType } from '@nebuia-ts/models';

export interface CreateAdvancedSignatureDTO {
  signs: AdvancedSignType[];
  requiresKYC: boolean;
  emails: string[];
  name: string;
  description?: string;
  jwt: string;
  document: File | Blob;
  graphicSign?: {
    x: number;
    y: number;
    width: number;
    height: number;
    page: number;
    email: string;
  }[];
}
