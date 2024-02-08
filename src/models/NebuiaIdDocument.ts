export const NebuiaIdDocumentSection = {
  FRONT: 'FRONT',
  BACK: 'BACK',
} as const;
export type NebuiaIdDocumentSection = keyof typeof NebuiaIdDocumentSection;

export type NebuiaIdDocument = {
  name: 'id' | 'passport';
  layers: string[];
  hasBackLayer: boolean;

  section: NebuiaIdDocumentSection;
  images: Blob[];
  imagesOriginal: Blob[];
};
