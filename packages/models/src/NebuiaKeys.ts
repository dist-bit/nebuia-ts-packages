import { NebuiaRawKeys } from './NebuiaCompany';

export type NebuiaKeys = {
  apiKey: string;
  apiSecret: string;
  keyId?: string;
};

export function convertKeysToHeaders(keys: NebuiaKeys): NebuiaRawKeys {
  return {
    public_key: keys.apiKey,
    secret_key: keys.apiSecret,
  };
}
