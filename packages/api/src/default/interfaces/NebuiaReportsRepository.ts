import { NebuiaReport } from '@nebuia-ts/models';

import { WithKeys, WithReport } from './common';

export interface NebuiaReportsRepository {
  generateReport(arg0: WithKeys): string;
  existReport(arg0: WithReport): NebuiaReport;
  getPDF(arg0: WithReport): ArrayBuffer;
}
