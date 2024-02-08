import { ReportValidity } from '../NebuiaReportValidity';

export interface AdvancedSignatureSigner {
  id: string;
  email: string;
  reportId?: string;

  hasSigned: boolean;
  signIndex: number;

  kycReportValidity?: ReportValidity;

  documentId: string;

  createdAt: string;
  updatedAt: string;
  signedAt?: string;
}
