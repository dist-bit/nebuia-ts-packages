import { NebuiaReport } from '@nebuia-ts/models';

import { WithReport } from './common';

export interface NebuiaReportsRepository {
  generateReport(): string;
  existReport(arg0: WithReport): NebuiaReport;
  getPDF(arg0: WithReport): ArrayBuffer;
}
