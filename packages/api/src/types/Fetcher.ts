import { convertKeysToHeaders, NebuiaKeys } from '@nebuia-ts/models';
import Axios, { AxiosResponse } from 'axios';

import { NebuiaApiFetchProps } from './Common';
import { IsomorphicFormData } from './FormData';
import { NebuiaApiResponse } from './NebuiaResponse';

const NebuiaApiUrl = 'https://api.nebuia.com/api/v1';
const axios = Axios.create();

type NebuiaApiRepositoryConfig = {
  successDataProp: string;
  errorDataProp: string;
};

export type ParsedApiMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer U) => infer R
    ? (...args: U) => NebuiaApiResponse<R>
    : never;
};

export abstract class NebuiaApiRepository {
  protected readonly config: NebuiaApiRepositoryConfig = {
    errorDataProp: 'payload',
    successDataProp: 'payload',
  };

  private _token: string | null = null;
  private _keys: NebuiaKeys | null = null;

  constructor(protected baseUrl: string = NebuiaApiUrl) {}

  public set token(value: string) {
    this._token = value;
  }

  public get token(): NebuiaApiResponse<string> {
    if (!this._token) {
      return Promise.resolve({
        status: false,
        payload: 'Token not set',
      });
    }

    return Promise.resolve({
      status: true,
      payload: this._token,
    });
  }

  public set keys(value: NebuiaKeys) {
    this._keys = value;
  }

  public get keys(): NebuiaApiResponse<NebuiaKeys> {
    if (!this._keys) {
      return Promise.resolve({
        status: false,
        payload: 'Keys not set',
      });
    }

    return Promise.resolve({
      status: true,
      payload: this._keys,
    });
  }

  protected async request<T extends Exclude<unknown, ArrayBuffer>>(
    props: NebuiaApiFetchProps,
  ): NebuiaApiResponse<T> {
    try {
      const response = await this.prepareRequest<T>(props);

      if (
        response.data instanceof ArrayBuffer &&
        props.responseType === 'arraybuffer'
      ) {
        return {
          status: true,
          payload: response.data as T,
        };
      }

      const data = response.data;

      if (!('status' in data)) {
        return {
          status: false,
          payload: 'Invalid response',
        };
      }

      if (data['status']) {
        return {
          status: true,
          payload: data[this.config.successDataProp] as T,
        };
      }

      return {
        status: false,
        payload: data[this.config.errorDataProp] as string,
      };
    } catch (e) {
      return {
        status: false,
        payload: this._parseError(e),
      };
    }
  }

  protected async requestFile(
    props: NebuiaApiFetchProps,
  ): NebuiaApiResponse<ArrayBuffer> {
    try {
      const response = await this.prepareRequest<ArrayBuffer>({
        ...props,
        responseType: 'arraybuffer',
        headers: {
          ...props.headers,
        },
      });
      if (
        !String(response.headers['content-type']).includes('application/json')
      ) {
        return {
          status: true,
          payload: response.data,
        };
      }

      const binaryString = String.fromCharCode.apply(
        null,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new Uint8Array(response.data),
      );
      const parsedData = JSON.parse(binaryString) as {
        payload: unknown;
      };

      return {
        status: false,
        payload: parsedData.payload as string,
      };
    } catch (e) {
      return {
        status: false,
        payload: this._parseError(e),
      };
    }
  }

  private async prepareRequest<T>(props: NebuiaApiFetchProps): Promise<
    AxiosResponse<
      T extends ArrayBuffer
        ? ArrayBuffer
        : {
            [key: string]: unknown;
          },
      unknown
    >
  > {
    const { method, path, body, headers, jwt, query, keys, responseType } =
      props;
    const token = await this._parseToken(jwt);
    const parsedKeys = await this._parseKeys(keys);

    const parsedBody =
      body instanceof IsomorphicFormData ? body.formData : body;
    const axiosConfig = {
      data: parsedBody,
      baseURL: this.baseUrl,
      params: query,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(parsedKeys ? convertKeysToHeaders(parsedKeys) : {}),
        ...(parsedBody instanceof IsomorphicFormData ? parsedBody.headers : {}),
      },
      method,
      url: path,
    };

    const response = await axios.request<T>({
      ...axiosConfig,
      ...(responseType ? { responseType } : {}),
    });

    return response as AxiosResponse<
      T extends ArrayBuffer
        ? ArrayBuffer
        : {
            [key: string]: unknown;
          },
      unknown
    >;
  }

  private async _parseToken(jwt?: string | NebuiaApiResponse<string>) {
    if (!jwt) {
      return;
    }
    if (typeof jwt === 'string') {
      return jwt;
    }
    const response = await jwt;
    if (!response.status) {
      throw new Error(response.payload);
    }

    return response.payload;
  }

  private async _parseKeys(keys?: NebuiaKeys | NebuiaApiResponse<NebuiaKeys>) {
    if (!keys) {
      return;
    }
    if (!(keys instanceof Promise)) {
      return keys;
    }
    const response = await keys;
    if (!response.status) {
      throw new Error(response.payload);
    }

    return response.payload;
  }

  private _parseError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return JSON.stringify(error);
  }
}

export class NebuiaApiFetcher {
  private readonly repositories: Record<string, NebuiaApiRepository> = {};

  public initToken(token: string): void {
    Object.values(this.repositories).forEach((repo) => {
      repo.token = token;
    });
  }

  public initKeys(keys: NebuiaKeys): void {
    Object.values(this.repositories).forEach((repo) => {
      repo.keys = keys;
    });
  }

  public register<T extends NebuiaApiRepository>(
    repository: T,
  ): NebuiaApiRepository {
    const name = repository.constructor.name;
    if (this.repositories[name]) {
      throw new Error(`Repository ${name} already registered`);
    }

    this.repositories[name] = repository;

    return repository;
  }

  public request<
    T extends NebuiaApiRepository,
    K extends keyof ParsedApiMethods<T>,
  >(
    repository: T,
    method: K,
    ...args: Parameters<ParsedApiMethods<T>[K]>
  ): ReturnType<ParsedApiMethods<T>[K]> {
    const name = repository.constructor.name;
    const repo = this.repositories[name];
    if (!repo) {
      throw new Error(`Repository ${name} not registered`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const action = repo[method] as (
      ...args: Parameters<ParsedApiMethods<T>[K]>
    ) => ReturnType<ParsedApiMethods<T>[K]>;

    return action(...args);
  }
}
