import {
  NebuiaAddress,
  NebuiaCompany,
  NebuiaIdDocument,
  NebuiaSteps,
} from '@nebuia-ts/models';

import { WithReport } from './common';

export interface NebuiaWidgetRepository {
  checkAuthCode<T>(arg0: WithReport<{ code: string }>): T;
  getOrigin(arg0: WithReport): string;
  getStepsCompany(arg0: WithReport): string[];
  getStepsFromReport(arg0: WithReport): NebuiaSteps;
  getCompanyKeys(
    arg0: WithReport,
  ): Pick<NebuiaCompany, 'keys' | 'otp'> & { report: string };
  savePhoneNumber<T>(arg0: WithReport<{ phone: string }>): T;
  saveEmail<T>(arg0: WithReport<{ email: string }>): T;
  generateOTPCode<T>(arg0: WithReport<{ toEmail: boolean }>): T;
  verifyOTPCode<T>(arg0: WithReport<{ toEmail: boolean; code: string }>): T;
  analiceFace(arg0: WithReport<{ img: Blob }>): {
    score: number;
    status: boolean;
  };
  qualityFace(arg0: WithReport<{ img: Blob }>): number;
  analiceID(arg0: WithReport<{ img: Blob }>): { image: string };
  uploadID<T>(arg0: WithReport<{ document: NebuiaIdDocument }>): T;
  getAddress(arg0: WithReport<{ img: Blob; isPDF: boolean }>): NebuiaAddress;
  saveAddress<T>(arg0: WithReport<{ address: NebuiaAddress }>): T;
  getFace(arg0: WithReport): ArrayBuffer;
  generateURL(arg0: WithReport): string;
  generateUrlSMS<T>(arg0: WithReport<{ phone: string }>): T;
  saveEmailPhone<T>(arg0: WithReport<{ value: string; toEmail: boolean }>): T;
}
