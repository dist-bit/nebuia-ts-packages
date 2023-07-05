import { AdvSigTemplateDocument } from '@nebuia-ts/models';

import { NebuiaApiRepository, ParsedApiMethods } from '../types/Fetcher';
import { NebuiaSignatureTemplateRepo } from './interfaces/NebuiaSignatureTemplateRepo';
import { NebuiaSignatureRepository } from './NebuiaSignatureRepo';

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
export class NebuiaSignatureTemplateRepository extends NebuiaApiRepository<NebuiaSignatureTemplateRepo> {
  public static i = NebuiaApiRepository.getInstance(NebuiaSignatureRepository);

  override baseUrl = 'https://api.distbit.io/contracts-api';

  override get actions(): ParsedApiMethods<NebuiaSignatureTemplateRepo> {
    const request = this.request.bind(this);
    const requestFile = this.requestFile.bind(this);

    return {
      async getAdvSigTemplates({ jwt }) {
        return request({
          method: 'get',
          path: '/advanced-signature-templates',
          jwt,
        });
      },
      async saveAdvSigTemplate({ jwt, template, file }) {
        const currentScale = 0.8;
        const expectedScale = 1;

        const parsedTemplate = parseTemplate(
          template,
          currentScale,
          expectedScale,
        );

        const body = new FormData();
        body.append('document', file);
        body.append('template', JSON.stringify(parsedTemplate));

        return request({
          method: 'post',
          path: '/advanced-signature-templates',
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'multipart/form-data',
          },
          body,
        });
      },
      async getAdvSigTemplateFile({ id, jwt }) {
        return requestFile({
          path: `/advanced-signature-templates/${id}/document`,
          method: 'get',
          jwt,
        });
      },
      async getAdvSigTemplate({ id, jwt }) {
        return request({
          method: 'get',
          path: `/advanced-signature-templates/${id}`,
          jwt,
        });
      },
      async createAdvSigByTemplate({ data, jwt }) {
        return request({
          method: 'post',
          path: `/advanced-signature/template`,
          jwt,
          body: data,
        });
      },
    };
  }
}
