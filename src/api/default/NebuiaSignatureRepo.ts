import { AdvancedSignatureSigner, AdvancedSignDocument } from '../../models';
import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { IsomorphicFormData } from '../types/FormData';
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

export class NebuiaAdminSignatureRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaSignatureRepo>
{
  constructor(baseUrl = 'https://signature.nebuia.com/api') {
    super(baseUrl);
  }

  async createAdvancedSignature(
    arg0: CreateAdvancedSignatureDTO,
  ): NebuiaApiResponse<{
    documentId: string;
    signers: {
      email: string;
      signatureLink: string;
    }[];
  }> {
    const jwt = this.token;
    const formData = new IsomorphicFormData();
    await formData.init();
    const { document, ...data } = arg0;
    formData.append('file', document, 'document.pdf');
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
      body: formData,
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
