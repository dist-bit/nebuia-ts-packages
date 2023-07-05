import { NebuiaCompanyWidgetSettings } from '@nebuia-ts/models';

export interface NebuiaCustomizationRepository {
  getCompanyTheme(): NebuiaCompanyWidgetSettings;
}
