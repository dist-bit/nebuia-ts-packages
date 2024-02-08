import { NebuiaStepNames } from './NebuiaSteps';

export type NebuiaRawKeys =
  | {
      public_key?: string;
      secret_key?: string;
    }
  | {
      public_key: string;
      secret_key: string;
    };

export type NebuiaCompanyCreditSettings = {
  domain?: string;
  platform_name?: string;
  collaborator_document_config?: {
    document_name: string;
    document_type: string;
  }[];
};

export type NebuiaCompanySettings = {
  image?: string;
  hook?: string;
  primary_color?: string;
  secondary_color?: string;
  credit: NebuiaCompanyCreditSettings;
};

export type NebuiaCompany = {
  id: string;
  name: string;
  ip?: string;
  origin?: string;
  origins?: string[];
  steps: NebuiaStepNames[];
  keys?: NebuiaRawKeys;
  settings: NebuiaCompanySettings;
  credits?: number;
  otp?: { secret: string };
  admin?: string;
};
