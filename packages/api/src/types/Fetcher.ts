import Axios, { AxiosResponse } from 'axios';

import { NebuiaApiFetchProps } from './Common';
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

export abstract class NebuiaApiRepository<I> {
  private static readonly _instances: Map<
    string,
    NebuiaApiRepository<unknown>
  > = new Map();

  protected readonly baseUrl: string = NebuiaApiUrl;
  protected readonly config: NebuiaApiRepositoryConfig = {
    errorDataProp: 'payload',
    successDataProp: 'payload',
  };

  public static getInstance<T extends NebuiaApiRepository<unknown>>(
    constructor: new () => T,
  ): T {
    const className = constructor.name;

    if (!NebuiaApiRepository._instances.has(className)) {
      NebuiaApiRepository._instances.set(className, new constructor());
    }

    return NebuiaApiRepository._instances.get(className) as T;
  }

  abstract get actions(): ParsedApiMethods<I>;

  protected async request<T extends Exclude<unknown, ArrayBuffer>>(
    props: NebuiaApiFetchProps,
  ): NebuiaApiResponse<T> {
    try {
      const response = await this.prepareRequest<T>(props);
      if (response.status) {
        return {
          status: true,
          payload: response.data[this.config.successDataProp] as T,
        };
      }

      return {
        status: false,
        payload: response.data[this.config.errorDataProp] as string,
      };
    } catch (e) {
      return {
        status: false,
        payload: this.parseError(e),
      };
    }
  }

  protected async requestFile(
    props: NebuiaApiFetchProps,
  ): NebuiaApiResponse<ArrayBuffer> {
    try {
      const response = await this.prepareRequest<ArrayBuffer>({
        ...props,
        headers: {
          ...props.headers,
          // responseType: 'arraybuffer',
          responseType: 'arraybuffer',
        },
      });
      const contentHeaders = [
        'content-type',
        'Content-Type',
        'Content-type',
        'content-Type',
      ];
      const hasJsonHeader = contentHeaders.some((header) =>
        String(response.headers[header]).includes('application/json'),
      );

      if (!hasJsonHeader) {
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
        payload: this.parseError(e),
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
    const { method, path, body, headers, jwt, query } = props;

    const response = await axios.request<T>({
      data: body,
      baseURL: this.baseUrl,
      params: query,
      headers: {
        ...headers,
        Authorization: jwt ? `Bearer ${jwt}` : undefined,
      },
      method,
      url: path,
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

  private parseError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return JSON.stringify(error);
  }
}

export class NebuiaApiFetcher {
  private readonly repositories: Record<string, NebuiaApiRepository<unknown>> =
    {};

  public registerRepository<T extends NebuiaApiRepository<unknown>>(
    repository: T,
  ): T extends NebuiaApiRepository<infer I> ? NebuiaApiRepository<I> : never {
    const name = repository.constructor.name;
    if (this.repositories[name]) {
      throw new Error(`Repository ${name} already registered`);
    }

    this.repositories[name] = repository;

    return repository as unknown as T extends NebuiaApiRepository<infer I>
      ? NebuiaApiRepository<I>
      : never;
  }

  public request<
    T extends NebuiaApiRepository<unknown>,
    K extends keyof T['actions'],
  >(
    repository: T,
    method: K,
    ...args: Parameters<T['actions'][K]>
  ): ReturnType<T['actions'][K]> {
    const name = repository.constructor.name;
    const repo = this.repositories[name];
    if (!repo) {
      throw new Error(`Repository ${name} not registered`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const action = repo.actions[method] as (
      ...args: Parameters<T['actions'][K]>
    ) => ReturnType<T['actions'][K]>;

    return action(...args);
  }
}
