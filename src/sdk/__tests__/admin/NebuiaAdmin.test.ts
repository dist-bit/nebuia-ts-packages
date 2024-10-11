import { NebuiaApiUrl } from '../../../api/__tests__/auth/login.test';
import { NebuiaAdmin } from '../../../sdk';

describe('Test the integration between api and sdk to auto login', () => {
  const credentials = {
    email: process.env['NEBUIA_USER'] ?? '',
    password: process.env['NEBUIA_PASSWORD'] ?? '',
  };
  const sdk = new NebuiaAdmin(NebuiaApiUrl);
  it('show login correctly', async () => {
    const result = await sdk.init(credentials);
    expect(result.status).toBe(true);

    const result2 = await sdk.getMyCompany();

    expect(result2.status).toBe(true);
  });
});
