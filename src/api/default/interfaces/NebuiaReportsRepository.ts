import {
  NebuiaCreateReportOptions,
  NebuiaKeys,
  NebuiaReport,
} from '../../../models';
import { WithReport, WithRfc } from './common';

export interface NebuiaReportsRepository {
  generateReport(arg0?: NebuiaCreateReportOptions): string;
  existReport(arg0: WithReport): NebuiaReport;
  getPDF(arg0: WithReport): ArrayBuffer;
  verifyKeys(keys: NebuiaKeys): unknown;
  updateRfc(arg0: WithReport<WithRfc>): unknown;
}
