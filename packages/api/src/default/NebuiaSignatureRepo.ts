import {
  AdvancedSignatureSigner,
  AdvancedSignCompany,
  AdvancedSignDocument,
  PartialAdvancedSignerSign,
} from '@nebuia-ts/models';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { CreateAdvancedSignatureDTO } from './dto/NebuiaSignatureDTOs';
import { NebuiaSignatureRepo } from './interfaces/NebuiaSignatureRepo';

const parseGraphicPlace = (
  place: { x: number; y: number; height: number; width: number },
  currentScale: number,
  expectedScale: number,
): { x: number; y: number; height: number; width: number } => {
  const scale = (value: number) => value * (expectedScale / currentScale);

  return {
    x: scale(place.x),
    y: scale(place.y),
    height: scale(place.height),
    width: scale(place.width),
  };
};

export class NebuiaSignatureRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaSignatureRepo>
{
  constructor(baseUrl = 'https://api.distbit.io/contracts-api') {
    super(baseUrl);
  }

  async createAdvancedSignature(
    arg0: CreateAdvancedSignatureDTO,
  ): NebuiaApiResponse<true> {
    const jwt = this.token;
    const formData = new FormData();
    const { document, ...data } = arg0;
    formData.append('file', document);
    formData.append(
      'document',
      JSON.stringify({
        ...data,
        graphicSign: data.graphicSign?.map((sign) => ({
          ...sign,
          ...parseGraphicPlace(sign, 0.8, 1),
        })),
      }),
    );

    return this.request({
      path: '/advanced-signature',
      method: 'post',
      jwt,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }

  async getAdvancedSignatureDocumentToSign(): NebuiaApiResponse<{
    document: AdvancedSignDocument & {
      company: AdvancedSignCompany;
    };
    sign: AdvancedSignatureSigner & {
      partialSigns: PartialAdvancedSignerSign[];
    };
  }> {
    const jwt = this.token;

    return this.request({
      path: '/advanced-signature/document/signer/invite',
      method: 'get',
      jwt,
    });
  }

  async getAdvancedSignatureDocumentFileToSign(): NebuiaApiResponse<ArrayBuffer> {
    const jwt = this.token;

    return this.requestFile({
      path: '/advanced-signature/document/signer/invite/file',
      method: 'get',
      jwt,
    });
  }

  async getAdvancedSignatureDocumentBase64FileToSign(): NebuiaApiResponse<string> {
    const jwt = this.token;

    return this.request({
      path: '/advanced-signature/document/signer/invite/file/base64',
      method: 'get',
      jwt,
    });
  }

  async getMyAdvancedSignatureDocuments(): NebuiaApiResponse<
    AdvancedSignDocument[]
  > {
    const jwt = this.token;

    return this.request({
      path: '/advanced-signature/all',
      method: 'get',
      jwt,
    });
  }

  async downloadOwnAdvancedSignatureDocumentFile(arg0: {
    id: string;
  }): NebuiaApiResponse<ArrayBuffer> {
    const jwt = this.token;
    const { id } = arg0;

    return this.requestFile({
      method: 'get',
      path: `/advanced-signature/document/${id}/file`,
      jwt,
    });
  }

  async downloadOwnFilledAdvancedSignatureDocumentFile(arg0: {
    id: string;
  }): NebuiaApiResponse<ArrayBuffer> {
    const jwt = this.token;
    const { id } = arg0;

    return this.requestFile({
      method: 'get',
      path: `/advanced-signature/document/${id}/filled/file`,
      jwt,
    });
  }

  async findAdvancedSignaturesByEmail(arg0: {
    email: string;
  }): NebuiaApiResponse<
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

  async requestAdvancedSignatureEmailVerification(arg0: {
    email: string;
    documentId: string;
  }): NebuiaApiResponse<boolean> {
    const { email, documentId } = arg0;

    return this.request({
      path: `/advanced-signature/request/email/verification/${documentId}/email/${email}`,
      method: 'post',
    });
  }

  async verifyAdvancedSignatureEmail(arg0: {
    email: string;
    documentId: string;
    code: string;
  }): NebuiaApiResponse<string> {
    const { email, documentId, code } = arg0;

    return this.request({
      path: `/advanced-signature/verify/email/${documentId}/email/${email}/code/${code}`,
      method: 'post',
    });
  }

  async saveAdvancedSignatureGraphSign(arg0: {
    sign: Blob;
  }): NebuiaApiResponse<true> {
    const jwt = this.token;
    const { sign } = arg0;
    const formData = new FormData();
    formData.append('file', sign);

    return this.request({
      path: '/advanced-signature/sign/save/graphic',
      method: 'post',
      jwt,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }

  async saveAdvancedSignatureFielSign(arg0: {
    cer: File;
    key: File;
    password: string;
  }): NebuiaApiResponse<true> {
    const jwt = this.token;
    const { cer, key, password } = arg0;
    const formData = new FormData();
    formData.append('cer', cer);
    formData.append('key', key);
    formData.append('password', password);

    return this.request({
      path: '/advanced-signature/sign/save/fiel',
      method: 'post',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }

  async getMyStatistics(): NebuiaApiResponse<{
    totalDocs: number;
    totalTemplates: number;
  }> {
    const jwt = this.token;

    return this.request({
      path: '/company/statistic',
      method: 'get',
      jwt,
    });
  }

  async getAdvancedSignatureDetails(arg0: {
    id: string;
  }): NebuiaApiResponse<
    AdvancedSignDocument & { signs: AdvancedSignatureSigner[] }
  > {
    const jwt = this.token;
    const { id } = arg0;

    return this.request({
      path: `/advanced-signature/document/${id}/details`,
      method: 'get',
      jwt,
    });
  }
}
