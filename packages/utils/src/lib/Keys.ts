import { NebuiaKeys, NebuiaRawKeys } from '@nebuia-ts/models';

export function convertKeysToHeaders(keys: NebuiaKeys): NebuiaRawKeys {
  return {
    public_key: keys.apiKey,
    secret_key: keys.apiSecret,
  };
}
