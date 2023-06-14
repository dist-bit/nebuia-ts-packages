import { NebuiaCompanyWidgetSettings, NebuiaKeys } from '@nebuia-ts/models';

export interface NebuiaCustomizationRepository {
  getCompanyTheme(keys: NebuiaKeys): NebuiaCompanyWidgetSettings;
}
