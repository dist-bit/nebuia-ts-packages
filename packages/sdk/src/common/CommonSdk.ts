import { NebuiaAdminApiRepository, NebuiaApiResponse } from '@nebuia-ts/api';

export class CommonSdk {}

type Credentials = {
  email: string;
  password: string;
};

export class CommonJwtSdk extends CommonSdk {
  protected _credentials: Credentials | null = null;
  protected readonly _token: string | null = null;

  private readonly _authRepo = new NebuiaAdminApiRepository();

  async login(credentials: Credentials): NebuiaApiResponse<string> {
    this._credentials = credentials;
    const response = await this._authRepo.login(credentials);
    if (!response.status) {
      return response;
    }

    this._authRepo.token = response.payload.token;

    return {
      status: true,
      payload: 'Login successful',
    };
  }

  protected async verifyToken(): Promise<NebuiaApiResponse<string>> {
    if (!this._credentials) {
      throw new Error('Login first');
    }
    if (!this._token) {
      throw new Error('Login first');
    }

    const { exp } = this.parseToken(this._token);

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const fiveMinutesInSeconds = 2 * 60; // 5 minutos en segundos
    const timeRemaining = exp - currentTimeInSeconds;

    if (timeRemaining < fiveMinutesInSeconds) {
      const response = await this.login(this._credentials);
      if (!response.status) {
        return response;
      }
    }

    return {
      status: true,
      payload: 'Token is valid',
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

    if (data === null || typeof data !== 'object') {
      throw new Error('Invalid token');
    }
    if (!('exp' in data && 'id' in data)) {
      throw new Error('Invalid token');
    }
    if (typeof data.exp !== 'number' || typeof data.id !== 'string') {
      throw new Error('Invalid token');
    }

    return {
      exp: data.exp,
      id: data.id,
    };
  }
}
