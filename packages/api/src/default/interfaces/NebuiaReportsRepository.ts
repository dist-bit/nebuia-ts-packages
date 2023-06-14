import { NebuiaKeys, NebuiaReport } from '@nebuia-ts/models';

type WithKeys<T = object> = T & { keys: NebuiaKeys };
type WithReport<T = object> = WithKeys<T & { report: string }>;

export interface NebuiaReportsRepository {
  generateReport(arg0: WithKeys): string;
  existReport(arg0: WithReport): NebuiaReport;
  getPDF(arg0: WithReport): ArrayBuffer;
}
