import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { IsomorphicFormData } from '../types/FormData';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { NebuiaSignerDocument } from './dto/NebuiaSignerDTO';
import { NebuiaSignerRepo } from './interfaces/NebuiaSignerRepository';

export class NebuiaSignerRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaSignerRepo>
{
  async useKyc(arg0: { newKyc: string }): NebuiaApiResponse<true> {
    const jwt = this.token;

    return this.request({
      path: '/advanced-signature/signer/use-kyc',
      method: 'put',
      jwt,
      body: { kyc: arg0.newKyc },
    });
  }

  async getDocumentToSign(): NebuiaApiResponse<NebuiaSignerDocument> {
    const jwt = this.token;

    return this.request({
      path: '/advanced-signature/document/signer/invite',
      method: 'get',
      jwt,
    });
  }

  async getDocumentFileToSign(): NebuiaApiResponse<ArrayBuffer> {
    const jwt = this.token;

    return this.requestFile({
      path: '/advanced-signature/document/signer/invite/file',
      method: 'get',
      jwt,
    });
  }

  async getDocumentBase64FileToSign(): NebuiaApiResponse<string> {
    const jwt = this.token;

    return this.request({
      path: '/advanced-signature/document/signer/invite/file/base64',
      method: 'get',
      jwt,
    });
  }

  async findDocumentsByEmail(arg0: { email: string }): NebuiaApiResponse<
    {
      id: string;
      name: string;
      description: string | null;
      createdAt: string;
      isFilled: boolean;
      company: { name: string };
    }[]
  > {
    const { email } = arg0;

    return this.request({
      path: `/advanced-signature/find/email/${email}`,
      method: 'get',
    });
  }

  async requestEmailVerification(arg0: {
    email: string;
    documentId: string;
  }): NebuiaApiResponse<boolean> {
    const { email, documentId } = arg0;

    return this.request({
      path: `/advanced-signature/request/email/verification/${documentId}/email/${email}`,
      method: 'post',
    });
  }

  async verifyEmail(arg0: {
    email: string;
    documentId: string;
    code: string;
  }): NebuiaApiResponse<string> {
    const { email, documentId, code } = arg0;

    const response = await this.request<string>({
      path: `/advanced-signature/verify/email/${documentId}/email/${email}/code/${code}`,
      method: 'post',
    });
    if (response.status) {
      this.token = response.payload;
    }

    return response;
  }

  async saveGraphSign(arg0: { sign: Blob | Buffer }): NebuiaApiResponse<true> {
    const jwt = this.token;
    const { sign } = arg0;
    const formData = new IsomorphicFormData();
    await formData.init();
    formData.append('file', sign, 'sign.png');

    return this.request({
      path: '/advanced-signature/sign/save/graphic',
      method: 'post',
      jwt,
      body: formData,
    });
  }

  async saveFielSign(arg0: {
    cer: Blob | Buffer;
    key: Blob | Buffer;
    password: string;
  }): NebuiaApiResponse<true> {
    const jwt = this.token;
    const { cer, key, password } = arg0;
    const formData = new IsomorphicFormData();
    await formData.init();
    formData.append('cer', cer, 'cer.cer');
    formData.append('key', key, 'key.key');
    formData.append('password', password);

    return this.request({
      path: '/advanced-signature/sign/save/fiel',
      method: 'post',
      jwt,
      body: formData,
    });
  }
}
