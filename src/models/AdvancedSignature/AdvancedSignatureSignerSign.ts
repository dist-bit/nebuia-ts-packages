import { AdvancedSignType } from './AdvancedSignatureDocument';

export interface PartialAdvancedSignerSign {
  id: string;

  signId: string;

  signType: AdvancedSignType;

  filled: boolean;

  extraData?: unknown;
  // ? for AdvancedSignType.graphic
  // ? {
  // ?   "x": 0,
  // ?   "y": 0,
  // ?   "width": 0,
  // ?   "height": 0,
  // ?   "page": 0
  // ? }
  // ? for AdvancedSignType.fiel
  // ? {
  // ? }
  // ? for AdvancedSignType.block_chain
  // ? {
  // ?   "blockChainId": "0x0",
  // ?   "blockChainName": "Ethereum",
  // ?   "blockChainNetwork": "Ropsten",
  // ?   "blockChainAddress": "0x0"
  // ? }
  createdAt: string;
  updatedAt: string;
  filledAt?: string;
}
