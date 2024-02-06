import {
  NebuiaAddress,
  NebuiaCompany,
  NebuiaCompanySettings,
  NebuiaReport,
  NebuiaStepNames,
} from '@nebuia-ts/models';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { IsomorphicFormData } from '../types/FormData';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
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
      ...this.parse('get'),
      path: `otp/verify/time_key/${code}`,
    });
  }

  async getOrigin(): NebuiaApiResponse<string> {
    return this.request({
      ...this.parse('get'),
      path: 'origin/company',
    });
  }

  async getStepsCompany(): NebuiaApiResponse<string[]> {
    return this.request({
      ...this.parse('get', true),
      path: 'steps/company',
    });
  }

  async getStepsFromReport(): NebuiaApiResponse<
    { name: NebuiaStepNames; status: boolean }[]
  > {
    return this.request({
      ...this.parse('get'),
      path: 'services/steps',
    });
  }

  async getCompanyKeys(): NebuiaApiResponse<
    Pick<NebuiaCompany, 'keys' | 'otp'> & { report: string }
  > {
    return this.request({
      ...this.parse('get'),
      path: 'mobile/data',
    });
  }

  async savePhoneNumber(
    phone: string,
    extension = '+52',
  ): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse('put'),
      path: 'services/phone',
      body: { phone: `${extension}${phone}` },
    });
  }

  async saveEmail(email: string): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse('put'),
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
      ...this.parse('get'),
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
      ...this.parse('get'),
      path: `services/otp/validate/${toEmail ? 'email' : 'phone'}/${code}`,
    });
  }

  async analiceFace(
    img: Blob,
  ): NebuiaApiResponse<{ score: number; status: boolean }> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('face', img, 'data.jpg');

    return this.request({
      ...this.parse('post'),
      path: 'services/face',
      body,
    });
  }

  async qualityFace(img: Blob): NebuiaApiResponse<number> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('face', img, 'data.jpg');

    return this.request({
      ...this.parse('post'),
      path: 'services/face/quality',
      body,
    });
  }

  async analiceID(img: Blob): NebuiaApiResponse<{ image: string }> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('front', img, 'data.jpg');

    return this.request({
      ...this.parse('post'),
      path: 'services/crop',
      body,
    });
  }

  async uploadID({
    images,
    name,
  }: {
    images: Blob[];
    name: 'id' | 'passport';
  }): NebuiaApiResponse<unknown> {
    const body = new IsomorphicFormData();
    await body.init();
    images.forEach((img, i) => {
      body.append(i === 0 ? 'front' : 'back', img, 'data.jpg');
    });
    body.append('document', name);

    return this.request({
      ...this.parse('post'),
      path: 'services/id/cropped/experimental',
      body,
    });
  }

  async getAddress({
    img,
    isPDF,
  }: {
    img: Blob;
    isPDF: boolean;
  }): NebuiaApiResponse<NebuiaAddress> {
    const body = new IsomorphicFormData();
    await body.init();
    body.append('document', img, isPDF ? 'data.pdf' : 'data.jpg');

    return this.request({
      ...this.parse('post'),
      body,
      path: 'services/address',
    });
  }

  async saveAddress(address: NebuiaAddress): NebuiaApiResponse<unknown> {
    const body = JSON.parse(JSON.stringify(address)) as Record<string, unknown>;

    return this.request({
      ...this.parse('put'),
      path: 'services/address',
      body,
    });
  }

  async getFace(): NebuiaApiResponse<ArrayBuffer> {
    return this.requestFile({
      ...this.parse('get'),
      path: 'services/faces',
    });
  }

  async generateURL(): NebuiaApiResponse<string> {
    return this.request({
      ...this.parse('get'),
      path: 'services/mobile/generate',
    });
  }

  async generateUrlSMS(
    phone: string,
    extension = '+52',
  ): NebuiaApiResponse<unknown> {
    return this.request({
      ...this.parse('get'),
      path: `services/mobile/generate/${extension}${phone}`,
    });
  }

  async saveEmailPhone(arg0: {
    value: string;
    toEmail: boolean;
  }): NebuiaApiResponse<unknown> {
    const { toEmail, value } = arg0;

    return this.request({
      ...this.parse('put'),
      path: `services/${toEmail ? 'email' : 'phone'}`,
      body: toEmail ? { email: value } : { phone: value },
    });
  }

  async getReportPDF(): NebuiaApiResponse<ArrayBuffer> {
    return this.requestFile({
      ...this.parse('get'),
      path: 'services/report/pdf',
    });
  }

  async createReport(): NebuiaApiResponse<string> {
    return this.request({
      ...this.parse('post', true),
      path: 'services/report',
    });
  }

  async getCompanyTheme(): NebuiaApiResponse<
    Partial<Pick<NebuiaCompanySettings, 'primary_color' | 'secondary_color'>>
  > {
    return this.request({
      ...this.parse('get', true),
      path: 'theme/company',
    });
  }

  async getReportObject(): NebuiaApiResponse<NebuiaReport> {
    return this.request({
      ...this.parse('get', true),
      path: 'services/report',
    });
  }

  async getCompanyLogo(): NebuiaApiResponse<ArrayBuffer> {
    return this.requestFile({
      ...this.parse('get', true),
      path: 'logo/image',
    });
  }

  async validateKeys(): NebuiaApiResponse<void> {
    return this.request({
      ...this.parse('get', true),
      path: 'services/keys/valid',
    });
  }

  async getCompanySettings(): NebuiaApiResponse<NebuiaCompany['settings']> {
    return this.request({
      ...this.parse('get', true),
      path: 'widget/company',
    });
  }

  private parse(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    omitError = false,
  ) {
    const keys = this.keys;
    const report = this.getReport(omitError);

    return {
      method,
      keys,
      query: { report },
    };
  }
}
