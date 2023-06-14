export type NebuiaApiQuery = Record<string, string>;
export type NebuiaApiFetchProps = {
  headers?: NebuiaApiQuery;
  query?: NebuiaApiQuery;
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: Record<string, unknown> | string | FormData;
  jwt?: string;
};
