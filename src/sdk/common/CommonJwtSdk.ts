import { NebuiaAdminApiRepository, NebuiaApiResponse } from '../../api';
import type { CredentialsStore, PromiseOr } from '../admin/CredentialsStore';
import { Credentials } from './CommonSdk';

export class CommonJwtSdkUtils {
  private readonly _authRepo: NebuiaAdminApiRepository;
  private _token: string | null = null;
  private _internalCredentials: Credentials | null = null;
  constructor(
    baseUrl: string,
    private readonly credentialsStore?: CredentialsStore,
  ) {
    this._authRepo = new NebuiaAdminApiRepository(baseUrl);
  }

  private get _credentials(): PromiseOr<Credentials | null> {
    if (this._internalCredentials) {
      return this._internalCredentials;
    }
    if (this.credentialsStore) {
      return this.credentialsStore.getCredentials();
    }

    return null;
  }

  private set _credentials(credentials: Credentials) {
    if (this.credentialsStore) {
      void this.credentialsStore.setCredentials(credentials);
    }
    this._internalCredentials = credentials;
  }

  set token(token: string) {
    parseToken(token);
    this._token = token;
  }

  get token(): string | null {
    return this._token;
  }

  async login(credentials: Credentials): NebuiaApiResponse<string> {
    this._credentials = credentials;
    const response = await this._authRepo.login(credentials);
    if (!response.status) {
      return response;
    }

    this._token = response.payload.token;

    return {
      status: true,
      payload: response.payload.token,
    };
  }

  async verifyToken(): NebuiaApiResponse<string> {
    const credentials = await this._credentials;
    if (!credentials) {
      return {
        status: false,
        payload: 'No credentials provided',
      };
    }
    if (!this._token) {
      return this.login(credentials);
    }

    const { exp } = parseToken(this._token);

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const fiveMinutesInSeconds = 2 * 60; // 5 minutos en segundos
    const timeRemaining = exp - currentTimeInSeconds;

    if (timeRemaining < fiveMinutesInSeconds) {
      return this.login(credentials);
    }

    return {
      status: true,
      payload: this._token,
    };
  }
}
// Función auxiliar para verificar si un objeto tiene las propiedades especificadas
function isObjectWithProperties(
  obj: unknown,
  properties: string[],
): obj is Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const prop of properties) {
    if (!(prop in obj)) {
      return false;
    }
  }

  return true;
}
function parseToken(token: string): { exp: number; id: string } {
  const base64 = token.split('.')[1] ?? '';
  let data: unknown;
  if ('atob' in globalThis) {
    data = JSON.parse(atob(base64)) as unknown;
  } else if ('Buffer' in globalThis) {
    data = JSON.parse(Buffer.from(base64, 'base64').toString()) as unknown;
  } else {
    throw new Error('No decoder found');
  }

  if (
    !isObjectWithProperties(data, ['exp', 'id']) ||
    typeof data['exp'] !== 'number' ||
    typeof data['id'] !== 'string'
  ) {
    throw new Error('Invalid token');
  }

  return {
    exp: data['exp'],
    id: data['id'],
  };
}
