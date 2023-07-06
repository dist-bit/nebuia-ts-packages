import { NebuiaApiRepository } from './Fetcher';

export type NebuiaApiQuery = Record<string, string>;
export type NebuiaApiFetchProps = {
  headers?: NebuiaApiQuery;
  query?: NebuiaApiQuery;
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: Record<string, unknown> | string | FormData;
  jwt?: string;
};

export type ApiMethods<Repo extends NebuiaApiRepository> = {
  [key in keyof Repo]: Repo[key] extends (
    props: infer Props,
  ) => Promise<infer Response>
    ? (props: Props) => Promise<Response>
    : never;
};
