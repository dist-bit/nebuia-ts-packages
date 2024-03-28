import type { Credentials } from '../common/CommonSdk';

export type CredentialsStore = {
  getCredentials(): Promise<Credentials | null>;
  setCredentials(credentials: Credentials): Promise<void>;
  clearCredentials(): Promise<void>;
};

export type PromiseOr<T> = T | Promise<T>;
