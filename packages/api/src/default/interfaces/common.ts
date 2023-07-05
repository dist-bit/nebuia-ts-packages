import { NebuiaKeys } from '@nebuia-ts/models';

export type WithKeys<T = object> = T & { keys: NebuiaKeys };
export type WithReport<T = object> = WithKeys<T & { report: string }>;
export type WithToken<T = object> = T & { jwt: string };
