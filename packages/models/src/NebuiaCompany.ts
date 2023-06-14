import { NebuiaStepNames } from './NebuiaSteps';

export type NebuiaCompanyWidgetSettings = {
  dark_mode?: boolean;
  primary_color?: string;
  secondary_color?: string;
};
export type NebuiaRawKeys =
  | {
      public_key?: string;
      secret_key?: string;
    }
  | {
      public_key: string;
      secret_key: string;
    };

export type NebuiaCompany = {
  id: string;
  name: string;
  ip: string;
  origin: string;
  steps: NebuiaStepNames[];
  keys?: NebuiaRawKeys;
  settings?: { widget?: NebuiaCompanyWidgetSettings };
  otp?: { secret: string };
  admin?: string;
};
