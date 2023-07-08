export type NebuiaKeys = {
  apiKey: string;
  apiSecret: string;
  keyId?: string;
};

export function convertKeysToHeaders(keys: NebuiaKeys): Record<string, string> {
  return {
    api_key: keys.apiKey,
    api_secret: keys.apiSecret,
  };
}
