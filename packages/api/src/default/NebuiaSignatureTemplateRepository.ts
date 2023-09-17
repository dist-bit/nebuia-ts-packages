import { AdvSigTemplateDocument } from '@nebuia-ts/models';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { IsomorphicFormData } from '../types/FormData';
import { NebuiaApiResponse } from '../types/NebuiaResponse';
import { NebuiaSignatureTemplateRepo } from './interfaces/NebuiaSignatureTemplateRepo';

const parseTemplate = (
  template: Omit<AdvSigTemplateDocument, 'company'>,
  currentScale: number,
  expectedScale: number,
): Omit<AdvSigTemplateDocument, 'id' | 'company'> => {
  const scale = (value: number) => value * (expectedScale / currentScale);

  return {
    ...template,
    pagesInfo: {
      count: template.pagesInfo.count,
      pages: template.pagesInfo.pages.map((page) => ({
        num: page.num,
        viewport: {
          height: scale(page.viewport.height),
          width: scale(page.viewport.width),
        },
      })),
    },
    signers: template.signers.map((signer) => ({
      index: signer.index,
      signPlace: signer.signPlace
        ? {
            x: scale(signer.signPlace.x),
            y: scale(signer.signPlace.y),
            w: scale(signer.signPlace.w),
            h: scale(signer.signPlace.h),
            page: signer.signPlace.page,
          }
        : undefined,
      requiredFields: signer.requiredFields?.map((field) => ({
        ...field,
        place: {
          x: scale(field.place.x),
          y: scale(field.place.y),
          w: scale(field.place.w),
          h: scale(field.place.h),
          page: field.place.page,
        },
      })),
    })),
  };
};
export class NebuiaSignatureTemplateRepository
  extends NebuiaApiRepository
  implements ParsedApiMethods<NebuiaSignatureTemplateRepo>
{
  constructor(baseUrl = 'https://api.distbit.io/contracts-api') {
    super(baseUrl);
  }

  async getAdvSigTemplates(): NebuiaApiResponse<
    (AdvSigTemplateDocument & { createdAt: string; updatedAt: string })[]
  > {
    const jwt = this.token;

    return this.request({
      method: 'get',
      path: '/advanced-signature-templates',
      jwt,
    });
  }

  async saveAdvSigTemplate(arg0: {
    template: Omit<AdvSigTemplateDocument, 'company' | 'id'>;
    file: Blob | Buffer;
  }): NebuiaApiResponse<true> {
    const jwt = this.token;
    const { template, file } = arg0;
    const currentScale = 0.8;
    const expectedScale = 1;

    const parsedTemplate = parseTemplate(template, currentScale, expectedScale);

    const body = new IsomorphicFormData();
    await body.init();
    body.append('document', file, 'document.pdf');
    body.append('template', JSON.stringify(parsedTemplate));

    return this.request({
      method: 'post',
      path: '/advanced-signature-templates',
      jwt,
      body,
    });
  }

  async getAdvSigTemplate(arg0: {
    id: string;
  }): NebuiaApiResponse<{ template: AdvSigTemplateDocument; file: string }> {
    const jwt = this.token;
    const { id } = arg0;

    return this.request({
      method: 'get',
      path: `/advanced-signature-templates/${id}`,
      jwt,
    });
  }

  async getAdvSigTemplateFile(arg0: {
    id: string;
  }): NebuiaApiResponse<ArrayBuffer> {
    const jwt = this.token;
    const { id } = arg0;

    return this.requestFile({
      path: `/advanced-signature-templates/${id}/document`,
      method: 'get',
      jwt,
    });
  }

  async createAdvSigByTemplate(arg0: {
    data: {
      templateId: string;
      signers: { email: string; kycId?: string }[];
    };
  }): NebuiaApiResponse<true> {
    const jwt = this.token;
    const { data } = arg0;

    return this.request({
      method: 'post',
      path: `/advanced-signature/template`,
      jwt,
      body: data,
    });
  }
}
