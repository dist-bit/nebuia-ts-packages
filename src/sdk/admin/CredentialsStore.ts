import type { Credentials } from '../common/CommonSdk';

export type CredentialsStore = {
  getCredentials(): PromiseOr<Credentials | null>;
  setCredentials(credentials: Credentials): PromiseOr<void>;
  clearCredentials(): PromiseOr<void>;
  getExistingToken?: () => PromiseOr<string | null>;
  setExistingToken?: (token: string) => PromiseOr<void>;
};

export type PromiseOr<T> = T | Promise<T>;
