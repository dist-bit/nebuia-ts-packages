import { NebuiaAdminApiRepository, NebuiaApiResponse } from '../../api';
import { Credentials } from './CommonSdk';

export class CommonJwtSdkUtils {
  private readonly _authRepo = new NebuiaAdminApiRepository();
  private _credentials: Credentials | null = null;
  private _token: string | null = null;

  set token(token: string) {
    this.parseToken(token);
    this._token = token;
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
    if (!this._credentials) {
      return {
        status: false,
        payload: 'No credentials provided',
      };
    }
    if (!this._token) {
      return this.login(this._credentials);
    }

    const { exp } = this.parseToken(this._token);

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const fiveMinutesInSeconds = 2 * 60; // 5 minutos en segundos
    const timeRemaining = exp - currentTimeInSeconds;

    if (timeRemaining < fiveMinutesInSeconds) {
      return this.login(this._credentials);
    }

    return {
      status: true,
      payload: this._token,
    };
  }

  private parseToken(token: string): { exp: number; id: string } {
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
