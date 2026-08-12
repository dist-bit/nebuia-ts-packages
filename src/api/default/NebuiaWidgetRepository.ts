import {
  type IsomorphicBlob,
  NebuiaAddress,
  NebuiaAllowedDocumentType,
  NebuiaCompany,
  NebuiaCompanySettings,
  NebuiaCreateReportOptions,
  NebuiaFaceIdStatus,
  NebuiaLivenessResult,
  NebuiaPassiveSignals,
  NebuiaReport,
  NebuiaStepNames,
} from '../../models';
import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { IsomorphicFormData } from '../types/FormData';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { parseCreateReportOptions } from './common/createReportOptions';
import { NebuiaWidgetRepository } from './interfaces/NebuiaWidgetRepository';

export class NebuiaWidgetApiRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaWidgetRepository>
{
  private _report: string | null = null;

  public getReport(omitError = false): string {
    if (!this._report && !omitError) {
      throw new Error('Report not found');
    }

    return this._report ?? '';
  }

  public setReport(value: string): void {
    this._report = value;
  }

  async checkAuthCode(code: string): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: `otp/verify/time_key/${code}`,
    });
  }

  async getOrigin(): NebuiaApiResponse<string> {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: 'origin/company',
    });
  }

  async getStepsCompany(): NebuiaApiResponse<string[]> {
    return this.request({
      ...this.parse({ method: 'get', omitError: true }),
      path: 'steps/company',
    });
  }

  async getDocumentTypes(): NebuiaApiResponse<NebuiaAllowedDocumentType[]> {
    return this.request({
      ...this.parse({ method: 'get', omitError: true }),
      path: 'steps/document-types',
    });
  }

  async getStepsFromReport(): NebuiaApiResponse<
    { name: NebuiaStepNames; status: boolean }[]
  > {
    const [stepsResult, reportResult] = await Promise.all([
      this.request<{ name: NebuiaStepNames; status: boolean }[]>({
        ...this.parse({ method: 'get' }),
        path: 'services/steps',
      }),
      this.getReportObject(),
    ]);

    if (!stepsResult.status) {
      return stepsResult;
    }

    const steps = stepsResult.payload;
    const livenessStep = steps.find((s) => s.name === 'liveness');
    if (livenessStep && reportResult.status) {
      const kyc = reportResult.payload.face?.liveness?.is_valid_for_kyc;
      if (kyc !== undefined) {
        livenessStep.status = kyc;
      }
    }

    return { status: true, payload: steps };
  }

  async getCompanyKeys(): NebuiaApiResponse<
    Pick<NebuiaCompany, 'keys' | 'otp'> & { report: string }
  > {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: 'mobile/data',
    });
  }

  async savePhoneNumber(
    phone: string,
    extension = '+52',
  ): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse({ method: 'put' }),
      path: 'services/phone',
      body: { phone: `${extension}${phone}` },
    });
  }

  async saveEmail(email: string): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse({ method: 'put' }),
      path: 'services/email',
      body: { email },
    });
  }

  async generateOTPCode({
    toEmail,
  }: {
    toEmail: boolean;
  }): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: `services/otp/generate/${toEmail ? 'email' : 'phone'}`,
    });
  }

  async verifyOTPCode({
    code,
    toEmail,
  }: {
    toEmail: boolean;
    code: string;
  }): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: `services/otp/validate/${toEmail ? 'email' : 'phone'}/${code}`,
    });
  }

  async analiceFace(
    img: IsomorphicBlob,
  ): NebuiaApiResponse<{ score: number; status: boolean }> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('face', img, 'data.jpg');

    return this.request({
      ...this.parse({ method: 'post' }),
      path: 'services/face',
      body,
    });
  }

  async qualityFace(img: IsomorphicBlob): NebuiaApiResponse<number> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('face', img, 'data.jpg');

    return this.request({
      ...this.parse({ method: 'post' }),
      path: 'services/face/quality',
      body,
    });
  }

  async analiceID(
    img: IsomorphicBlob,
    side?: 'front' | 'back',
  ): NebuiaApiResponse<{ image: string }> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append(side ?? 'front', img, 'data.jpg');

    return this.request({
      ...this.parse({ method: 'post' }),
      path: 'services/crop',
      body,
    });
  }

  async uploadID({
    images,
    name,
  }: {
    images: IsomorphicBlob[];
    name: 'id' | 'passport';
  }): NebuiaApiResponse<unknown> {
    const body = new IsomorphicFormData();
    await body.init();
    images.forEach((img, i) => {
      body.append(i === 0 ? 'front' : 'back', img, 'data.jpg');
    });
    body.append('document', name);

    return this.request({
      ...this.parse({ method: 'post' }),
      path: 'services/id/cropped/experimental',
      body,
    });
  }

  async getAddress({
    img,
    isPDF,
  }: {
    img: IsomorphicBlob;
    isPDF: boolean;
  }): NebuiaApiResponse<NebuiaAddress> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('document', img, isPDF ? 'data.pdf' : 'data.jpg');

    return this.request({
      ...this.parse({ method: 'post' }),
      body,
      path: 'services/address',
    });
  }

  async saveAddress(address: NebuiaAddress): NebuiaApiResponse<unknown> {
    const body = JSON.parse(JSON.stringify(address)) as Record<string, unknown>;

    return this.request({
      ...this.parse({ method: 'put' }),
      path: 'services/address',
      body,
    });
  }

  async getFace(): NebuiaApiResponse<ArrayBuffer> {
    return this.requestFile({
      ...this.parse({ method: 'get' }),
      path: 'services/faces',
    });
  }

  async generateURL(): NebuiaApiResponse<string> {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: 'services/mobile/generate',
    });
  }

  async generateUrlSMS(
    phone: string,
    extension = '+52',
  ): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: `services/mobile/generate/${extension}${phone}`,
    });
  }

  async saveEmailPhone(arg0: {
    value: string;
    toEmail: boolean;
  }): NebuiaApiResponse<unknown> {
    const { toEmail, value } = arg0;

    return this.request({
      ...this.parse({ method: 'put' }),
      path: `services/${toEmail ? 'email' : 'phone'}`,
      body: toEmail ? { email: value } : { phone: value },
    });
  }

  async getReportPDF(): NebuiaApiResponse<ArrayBuffer> {
    return this.requestFile({
      ...this.parse({ method: 'get' }),
      path: 'services/report/pdf',
    });
  }

  async createReport(
    arg0?: NebuiaCreateReportOptions,
  ): NebuiaApiResponse<string> {
    const body = parseCreateReportOptions(arg0);

    return this.request({
      ...this.parse({ method: 'post', omitError: true }),
      path: 'services/report',
      ...(body ? { body } : {}),
    });
  }

  async getCompanyTheme(): NebuiaApiResponse<
    Partial<Pick<NebuiaCompanySettings, 'primary_color' | 'secondary_color'>>
  > {
    return this.request({
      ...this.parse({ method: 'get', omitError: true }),
      path: 'theme/company',
    });
  }

  async getReportObject(): NebuiaApiResponse<NebuiaReport> {
    return this.request({
      ...this.parse({ method: 'get', omitError: true }),
      path: 'services/report',
    });
  }

  async getCompanyLogo(): NebuiaApiResponse<ArrayBuffer> {
    return this.requestFile({
      ...this.parse({ method: 'get', omitError: true }),
      path: 'logo/image',
    });
  }

  async validateKeys(): NebuiaApiResponse<void> {
    return this.request({
      ...this.parse({ method: 'get', omitError: true }),
      path: 'services/keys/valid',
    });
  }

  async getCompanySettings(): NebuiaApiResponse<NebuiaCompany['settings']> {
    return this.request({
      ...this.parse({ method: 'get', omitError: true }),
      path: 'widget/company',
    });
  }

  async createFaceCaptureSession(): NebuiaApiResponse<{
    session_id: string;
  }> {
    return this.request({
      ...this.parse({ method: 'post' }),
      path: 'services/face/capture-session',
    });
  }

  async analyzeLiveness(arg0: {
    sessionId: string;
    frameNormal: IsomorphicBlob;
    frameClose: IsomorphicBlob;
  }): NebuiaApiResponse<NebuiaLivenessResult> {
    const { sessionId, frameNormal, frameClose } = arg0;
    const body = new IsomorphicFormData();
    await body.init();
    body.append('session_id', sessionId);
    body.append('timestamp', String(Date.now()));
    body.append('frame_normal', frameNormal, 'selfie_normal.jpg');
    body.append('frame_close', frameClose, 'selfie_close.jpg');

    return this.request({
      ...this.parse({ method: 'post' }),
      path: 'services/face/analyze-liveness',
      body,
    });
  }

  async getFaceIdStatus(): NebuiaApiResponse<NebuiaFaceIdStatus> {
    return this.request({
      ...this.parse({ method: 'get' }),
      path: 'services/face/id-status',
    });
  }

  async sendPassiveSignals(
    arg0: NebuiaPassiveSignals,
  ): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse({ method: 'post' }),
      path: 'services/face/passive-signals',
      body: arg0 as unknown as Record<string, unknown>,
    });
  }

  private parse({
    method,
    omitError = false,
    omitReport = false,
  }: {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    omitError?: boolean;
    omitReport?: boolean;
  }) {
    if (this.sessionToken) {
      return {
        method,
        sessionToken: this.sessionToken,
      };
    }

    const keys = this.keys;
    const report = this.getReport(omitError);
    if (!omitReport) {
      return {
        method,
        keys,
        query: { report },
      };
    }

    return {
      method,
      keys,
    };
  }
}
