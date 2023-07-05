import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
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

export class NebuiaSignatureRepository extends NebuiaApiRepository<NebuiaSignatureRepo> {
  public static i = NebuiaApiRepository.getInstance(NebuiaSignatureRepository);

  override baseUrl = 'https://api.distbit.io/contracts-api';

  override get actions(): ParsedApiMethods<NebuiaSignatureRepo> {
    const request = this.request.bind(this);
    const requestFile = this.requestFile.bind(this);

    return {
      async createAdvancedSignature({ jwt, document, ...data }) {
        const formData = new FormData();
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

        return request({
          path: '/advanced-signature',
          method: 'post',
          jwt,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
      },
      async getAdvancedSignatureDocumentFileToSign({ jwt }) {
        return requestFile({
          path: '/advanced-signature/document/signer/invite/file',
          method: 'get',
          jwt,
        });
      },
      async getAdvancedSignatureDocumentBase64FileToSign({ jwt }) {
        return request({
          path: '/advanced-signature/document/signer/invite/file/base64',
          method: 'get',
          jwt,
        });
      },
      async getAdvancedSignatureDocumentToSign({ jwt }) {
        return request({
          path: '/advanced-signature/document/signer/invite',
          method: 'get',
          jwt,
        });
      },
      async getMyAdvancedSignatureDocuments({ jwt }) {
        return request({
          path: '/advanced-signature/all',
          method: 'get',
          jwt,
        });
      },
      async downloadOwnAdvancedSignatureDocumentFile({ jwt, id }) {
        return requestFile({
          method: 'get',
          path: `/advanced-signature/document/${id}/file`,
          jwt,
        });
      },
      async downloadOwnFilledAdvancedSignatureDocumentFile({ jwt, id }) {
        return requestFile({
          method: 'get',
          path: `/advanced-signature/document/${id}/filled/file`,
          jwt,
        });
      },
      async findAdvancedSignaturesByEmail({ email }) {
        return request({
          path: `/advanced-signature/find/email/${email}`,
          method: 'get',
        });
      },

      async requestAdvancedSignatureEmailVerification({ documentId, email }) {
        return request({
          path: `/advanced-signature/request/email/verification/${documentId}/email/${email}`,
          method: 'post',
        });
      },

      async verifyAdvancedSignatureEmail({ documentId, email, code }) {
        return request({
          path: `/advanced-signature/verify/email/${documentId}/email/${email}/code/${code}`,
          method: 'post',
        });
      },

      async saveAdvancedSignatureGraphSign({ jwt, sign }) {
        const formData = new FormData();
        formData.append('file', sign);

        return request({
          path: '/advanced-signature/sign/save/graphic',
          method: 'post',
          jwt,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
      },
      async saveAdvancedSignatureFielSign({ jwt, cer, key, password }) {
        const formData = new FormData();
        formData.append('cer', cer);
        formData.append('key', key);
        formData.append('password', password);

        return request({
          path: '/advanced-signature/sign/save/fiel',
          method: 'post',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
      },
      async getMyStatistics({ jwt }) {
        return request({
          path: '/company/statistic',
          method: 'get',
          jwt,
        });
      },
      async getAdvancedSignatureDetails({ jwt, id }) {
        return request({
          path: `/advanced-signature/document/${id}/details`,
          method: 'get',
          jwt,
        });
      },
    };
  }
}
