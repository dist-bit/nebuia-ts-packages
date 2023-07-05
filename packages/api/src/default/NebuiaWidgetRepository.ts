import {
  NebuiaAddress,
  NebuiaCompany,
  NebuiaIdDocument,
  NebuiaSteps,
} from '@nebuia-ts/models';
import { convertKeysToHeaders } from '@nebuia-ts/utils';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { WithReport } from './interfaces/common';
import { NebuiaWidgetRepository } from './interfaces/NebuiaWidgetRepository';

export class NebuiaWidgetApiRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaWidgetRepository>
{
  async checkAuthCode(
    arg0: WithReport<{ code: string }>,
  ): NebuiaApiResponse<unknown> {
    const { code } = arg0;

    return this.request({
      ...this.parse('get', arg0),
      path: `otp/verify/time_key/${code}`,
    });
  }

  async getOrigin(arg0: WithReport): NebuiaApiResponse<string> {
    return this.request({
      ...this.parse('get', arg0),
      path: 'origin/company',
    });
  }

  async getStepsCompany(arg0: WithReport): NebuiaApiResponse<string[]> {
    return this.request({
      ...this.parse('get', arg0),
      path: 'steps/company',
    });
  }

  async getStepsFromReport(arg0: WithReport): NebuiaApiResponse<NebuiaSteps> {
    return this.request({
      ...this.parse('get', arg0),
      path: 'services/steps',
    });
  }

  async getCompanyKeys(
    arg0: WithReport,
  ): NebuiaApiResponse<
    Pick<NebuiaCompany, 'keys' | 'otp'> & { report: string }
  > {
    return this.request({
      ...this.parse('get', arg0),
      path: 'mobile/data',
    });
  }

  async savePhoneNumber(
    arg0: WithReport<{ phone: string }>,
  ): NebuiaApiResponse<unknown> {
    const { phone } = arg0;

    return this.request({
      ...this.parse('put', arg0),
      path: 'services/phone',
      body: { phone: `+52${phone}` },
    });
  }

  async saveEmail(
    arg0: WithReport<{ email: string }>,
  ): NebuiaApiResponse<unknown> {
    const { email } = arg0;

    return this.request({
      ...this.parse('put', arg0),
      path: 'services/email',
      body: { email },
    });
  }

  async generateOTPCode(
    arg0: WithReport<{ toEmail: boolean }>,
  ): NebuiaApiResponse<unknown> {
    const { toEmail } = arg0;

    return this.request({
      ...this.parse('get', arg0),
      path: `services/otp/generate/${toEmail ? 'email' : 'phone'}`,
    });
  }

  async verifyOTPCode(
    arg0: WithReport<{ toEmail: boolean; code: string }>,
  ): NebuiaApiResponse<unknown> {
    const { code, toEmail } = arg0;

    return this.request({
      ...this.parse('get', arg0),
      path: `services/otp/validate/${toEmail ? 'email' : 'phone'}/${code}`,
    });
  }

  async analiceFace(
    arg0: WithReport<{ img: Blob }>,
  ): NebuiaApiResponse<{ score: number; status: boolean }> {
    const { img } = arg0;
    const body = new FormData();
    body.append('face', img, 'data.jpg');

    return this.request({
      ...this.parse('post', arg0),
      path: 'services/face',
      body,
    });
  }

  async qualityFace(
    arg0: WithReport<{ img: Blob }>,
  ): NebuiaApiResponse<number> {
    const { img } = arg0;
    const body = new FormData();
    body.append('face', img, 'data.jpg');

    return this.request({
      ...this.parse('post', arg0),
      path: 'services/face/quality',
      body,
    });
  }

  async analiceID(
    arg0: WithReport<{ img: Blob }>,
  ): NebuiaApiResponse<{ image: string }> {
    const { img } = arg0;
    const body = new FormData();
    body.append('front', img, 'data.jpg');

    return this.request({
      ...this.parse('post', arg0),
      path: 'services/crop',
      body,
    });
  }

  async uploadID(
    arg0: WithReport<{ document: NebuiaIdDocument }>,
  ): NebuiaApiResponse<unknown> {
    const { document } = arg0;
    const body = new FormData();
    document.images.forEach((img, i) => {
      body.append(i === 0 ? 'front' : 'back', img, 'data.jpg');
    });
    body.append('document', document.name);

    return this.request({
      ...this.parse('post', arg0),
      path: 'services/id/cropped/experimental',
      body,
    });
  }

  async getAddress(
    arg0: WithReport<{ img: Blob; isPDF: boolean }>,
  ): NebuiaApiResponse<NebuiaAddress> {
    const { isPDF, img } = arg0;
    const body = new FormData();
    body.append('document', img, isPDF ? 'data.pdf' : 'data.jpg');

    return this.request({
      ...this.parse('post', arg0),
      path: 'services/address',
    });
  }

  async saveAddress(
    arg0: WithReport<{ address: NebuiaAddress }>,
  ): NebuiaApiResponse<unknown> {
    const { address } = arg0;

    const body = JSON.parse(JSON.stringify(address)) as Record<string, unknown>;

    return this.request({
      ...this.parse('post', arg0),
      path: 'services/address',
      body,
    });
  }

  async getFace(arg0: WithReport): NebuiaApiResponse<ArrayBuffer> {
    return this.requestFile({
      ...this.parse('get', arg0),
      path: 'services/faces',
    });
  }

  async generateURL(arg0: WithReport): NebuiaApiResponse<string> {
    return this.request({
      ...this.parse('get', arg0),
      path: 'services/mobile/generate',
    });
  }

  async generateUrlSMS(
    arg0: WithReport<{ phone: string }>,
  ): NebuiaApiResponse<unknown> {
    const { phone } = arg0;

    return this.request({
      ...this.parse('get', arg0),
      path: `services/mobile/generate/${phone}`,
    });
  }

  async saveEmailPhone(
    arg0: WithReport<{ value: string; toEmail: boolean }>,
  ): NebuiaApiResponse<unknown> {
    const { toEmail, value } = arg0;

    return this.request({
      ...this.parse('put', arg0),
      path: `services/${toEmail ? 'email' : 'phone'}`,
      body: toEmail ? { email: value } : { phone: `+52${value}` },
    });
  }

  private parse(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    props: { report: string },
  ) {
    const keys = this.keys;

    return {
      method,
      headers: convertKeysToHeaders(keys),
      query: { report: props.report },
    };
  }
}
