import {
  NebuiaAddress,
  NebuiaCompany,
  NebuiaCompanySettings,
  NebuiaReport,
  NebuiaStepNames,
} from '@nebuia-ts/models';

export interface NebuiaWidgetRepository {
  checkAuthCode<T>(arg0: string): T;
  getOrigin(): string;
  getStepsCompany(): string[];
  getStepsFromReport(): { name: NebuiaStepNames; status: boolean }[];
  getCompanyKeys(): Pick<NebuiaCompany, 'keys' | 'otp'> & { report: string };
  savePhoneNumber<T>(phone: string, extension?: string): T;
  saveEmail<T>(email: string): T;
  generateOTPCode<T>(arg0: { toEmail: boolean }): T;
  verifyOTPCode<T>(arg0: { toEmail: boolean; code: string }): T;
  analiceFace(img: Blob): {
    score: number;
    status: boolean;
  };
  qualityFace(arg0: Blob): number;
  analiceID(arg0: Blob): { image: string };
  uploadID<T>(arg0: { images: Blob[]; name: 'id' | 'passport' }): T;
  getAddress(arg0: { img: Blob; isPDF: boolean }): NebuiaAddress;
  saveAddress<T>(address: NebuiaAddress): T;
  getFace(): ArrayBuffer;
  generateURL(): string;
  generateUrlSMS<T>(phone: string, extension?: string): T;
  saveEmailPhone<T>(arg0: { value: string; toEmail: boolean }): T;
  getReportPDF(): ArrayBuffer;
  createReport(): string;
  getCompanyTheme(): Partial<
    Pick<NebuiaCompanySettings, 'primary_color' | 'secondary_color'>
  >;
  getReportObject(): NebuiaReport;
  getCompanyLogo(): ArrayBuffer;
  validateKeys(): void;
  getCompanySettings(): NebuiaCompany['settings'];
}
