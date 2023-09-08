import { NebuiaKeys } from '@nebuia-ts/models';

import { NebuiaApiRepository } from './Fetcher';
import { IsomorphicFormData } from './FormData';
import { NebuiaApiResponse } from './NebuiaResponse';

export type NebuiaApiQuery = Record<string, string>;
export type NebuiaApiFetchProps = {
  headers?: NebuiaApiQuery;
  query?: NebuiaApiQuery;
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: Record<string, unknown> | string | IsomorphicFormData;
  jwt?: string | NebuiaApiResponse<string>;
  keys?: NebuiaKeys | NebuiaApiResponse<NebuiaKeys>;
  responseType?: 'arraybuffer';
};

export type ApiMethods<Repo extends NebuiaApiRepository> = {
  [key in keyof Repo]: Repo[key] extends (
    props: infer Props,
  ) => Promise<infer Response>
    ? (props: Props) => Promise<Response>
    : never;
};
