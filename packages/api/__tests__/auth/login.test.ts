import { NebuiaAdminApiRepository, NebuiaApiFetcher } from '../../src';
import { NebuiaSignatureRepository } from '../../src/default/NebuiaSignatureRepo';

describe('Verify auth methods', () => {
  const repositoryContainer = new NebuiaApiFetcher();
  const authRepository = new NebuiaAdminApiRepository();
  const signatureRepository = new NebuiaSignatureRepository();

  repositoryContainer.register(authRepository);
  repositoryContainer.register(signatureRepository);

  it('should login with valid credentials and integrate token in others repositories', async () => {
    const repository = new NebuiaAdminApiRepository();
    const user = process.env['NEBUIA_USER'] ?? '';
    const pass = process.env['NEBUIA_PASSWORD'] ?? '';
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
});
