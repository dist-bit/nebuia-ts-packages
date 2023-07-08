import { NebuiaAdminApiRepository, NebuiaApiFetcher } from '../../src';
import { NebuiaAdminSignatureRepository } from '../../src/default/NebuiaSignatureRepo';

describe('Verify auth methods', () => {
  const repositoryContainer = new NebuiaApiFetcher();
  const authRepository = new NebuiaAdminApiRepository();
  const signatureRepository = new NebuiaAdminSignatureRepository();

  repositoryContainer.register(authRepository);
  repositoryContainer.register(signatureRepository);

  const repository = new NebuiaAdminApiRepository();
  const user = process.env['NEBUIA_USER'] ?? '';
  const pass = process.env['NEBUIA_PASSWORD'] ?? '';

  it('should login with valid credentials and integrate token in others repositories', async () => {
    const response = await repository.login({ email: user, password: pass });

    expect(response.status).toBe(true);
    expect(response.payload).toHaveProperty('token');

    if (response.status) {
      repositoryContainer.initToken(response.payload.token);
    }

    const documents =
      await signatureRepository.getMyAdvancedSignatureDocuments();

    expect(documents.status).toBe(true);
  });

  it('should load the keys', async () => {
    const response = await authRepository.getMyCompany();

    expect(response.status).toBe(true);
    expect(response.payload).toHaveProperty('keys');
    if (response.status && response.payload.keys) {
      repositoryContainer.initKeys({
        apiKey: response.payload.keys.apiKey ?? '',
        apiSecret: response.payload.keys.secret_key ?? '',
      });
    }

    const response2 = await authRepository.getReportsByCompany();

    expect(response2.status).toBe(true);
    expect(response2.payload).toBeDefined();
  });
});
