import { ParsedApiMethods } from './Fetcher';
import { NebuiaApiResult } from './NebuiaResult';

export type NebuiaApiResponse<T> = Promise<NebuiaApiResult<T>>;

export type NebuiaParsedApiRepository<T> = ParsedApiMethods<T>;

export type ParsedNebuiaRepository<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => NebuiaApiResponse<infer R>
    ? (...args: A) => NebuiaApiResponse<R>
    : never;
};

export type NebuiaApiMethodResult<T> = T extends (...args: never[]) => infer R
  ? R extends NebuiaApiResponse<infer D>
    ? D
    : never
  : never;
