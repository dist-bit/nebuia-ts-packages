import { NebuiaAdmin } from '../../src/admin/NebuiaAdmin';

describe('Test the integration between api and sdk to auto login', () => {
  const credentials = {
    email: process.env['NEBUIA_USER'] ?? '',
    password: process.env['NEBUIA_PASSWORD'] ?? '',
  };
  const sdk = new NebuiaAdmin();
  it('show login correctly', async () => {
    const result = await sdk.init(credentials);

    expect(result.status).toBe(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const result2 = await sdk.getMyCompany();

    expect(result2.status).toBe(true);
  }, 10000);
});
