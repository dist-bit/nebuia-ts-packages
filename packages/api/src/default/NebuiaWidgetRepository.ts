/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NebuiaKeys } from '@nebuia-ts/models';
import { convertKeysToHeaders } from '@nebuia-ts/utils';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaWidgetRepository } from './interfaces/NebuiaWidgetRepository';

export class NebuiaWidgetApiRepository extends NebuiaApiRepository<NebuiaWidgetRepository> {
  public static i = NebuiaApiRepository.getInstance(NebuiaWidgetApiRepository);

  override get actions(): ParsedApiMethods<NebuiaWidgetRepository> {
    const request = this.request.bind(this);
    const parse = this.makeRequest.bind(this);
    const requestFile = this.requestFile.bind(this);

    return {
      async checkAuthCode(arg0) {
        const { code } = arg0;

        return request({
          ...parse('get', arg0),
          path: `otp/verify/time_key/${code}`,
        });
      },
      async analiceFace(arg0) {
        const { img } = arg0;
        const body = new FormData();
        body.append('face', img, 'data.jpg');

        return request({
          ...parse('post', arg0),
          path: 'services/face',
          body,
        });
      },
      async analiceID(arg0) {
        const { img } = arg0;
        const body = new FormData();
        body.append('front', img, 'data.jpg');

        return request({
          ...parse('post', arg0),
          path: 'services/crop',
          body,
        });
      },
      async generateOTPCode(arg0) {
        const { toEmail } = arg0;

        return request({
          ...parse('get', arg0),
          path: `services/otp/generate/${toEmail ? 'email' : 'phone'}`,
        });
      },
      async generateURL(arg0) {
        return request({
          ...parse('get', arg0),
          path: 'services/mobile/generate',
        });
      },
      async generateUrlSMS(arg0) {
        const { phone } = arg0;

        return request({
          ...parse('get', arg0),
          path: `services/mobile/generate/${phone}`,
        });
      },
      async getAddress(arg0) {
        const { isPDF, img } = arg0;
        const body = new FormData();
        body.append('document', img, isPDF ? 'data.pdf' : 'data.jpg');

        return request({
          ...parse('post', arg0),
          path: 'services/address',
        });
      },
      async getCompanyKeys(arg0) {
        return request({
          ...parse('get', arg0),
          path: 'mobile/data',
        });
      },
      async getFace(arg0) {
        return requestFile({
          ...parse('get', arg0),
          path: 'services/faces',
        });
      },
      async getOrigin(arg0) {
        return request({
          ...parse('get', arg0),
          path: 'origin/company',
        });
      },
      async getStepsCompany(arg0) {
        return request({
          ...parse('get', arg0),
          path: 'steps/company',
        });
      },
      async getStepsFromReport(arg0) {
        return request({
          ...parse('get', arg0),
          path: 'services/steps',
        });
      },
      async qualityFace(arg0) {
        const { img } = arg0;
        const body = new FormData();
        body.append('face', img, 'data.jpg');

        return request({
          ...parse('post', arg0),
          path: 'services/face/quality',
          body,
        });
      },
      async saveAddress(arg0) {
        const { address } = arg0;

        const body = JSON.parse(JSON.stringify(address)) as Record<
          string,
          unknown
        >;

        return request({
          ...parse('post', arg0),
          path: 'services/address',
          body,
        });
      },
      async saveEmail(arg0) {
        const { email } = arg0;

        return request({
          ...parse('put', arg0),
          path: 'services/email',
          body: { email },
        });
      },
      async saveEmailPhone(arg0) {
        const { toEmail, value } = arg0;

        return request({
          ...parse('put', arg0),
          path: `services/${toEmail ? 'email' : 'phone'}`,
          body: toEmail ? { email: value } : { phone: `+52${value}` },
        });
      },
      async savePhoneNumber(arg0) {
        const { phone } = arg0;

        return request({
          ...parse('put', arg0),
          path: 'services/phone',
          body: { phone: `+52${phone}` },
        });
      },
      async uploadID(arg0) {
        const { document } = arg0;
        const body = new FormData();
        document.images.forEach((img, i) => {
          body.append(i === 0 ? 'front' : 'back', img, 'data.jpg');
        });
        body.append('document', document.name);

        return request({
          ...parse('post', arg0),
          path: 'services/id/cropped/experimental',
          body,
        });
      },
      async verifyOTPCode(arg0) {
        const { code, toEmail } = arg0;

        return request({
          ...parse('get', arg0),
          path: `services/otp/validate/${toEmail ? 'email' : 'phone'}/${code}`,
        });
      },
    };
  }

  private makeRequest(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    props: { report: string; keys: NebuiaKeys },
  ) {
    return {
      method,
      headers: convertKeysToHeaders(props.keys),
      query: { report: props.report },
    };
  }
}
