export const NebuiaStepNames = {
  email: 'email',
  phone: 'phone',
  liveness: 'liveness',
  address: 'address',
  id: 'id',
} as const;

export type NebuiaStepNames = keyof typeof NebuiaStepNames;

export type NebuiaStep = {
  name: NebuiaStepNames;
  status: boolean;
};

export type NebuiaSteps = {
  steps: NebuiaStepNames[];
};

export const NebuiaAllowedDocumentTypes = {
  ine: 'ine',
  passport: 'passport',
} as const;

export type NebuiaAllowedDocumentType = keyof typeof NebuiaAllowedDocumentTypes;

export type NebuiaDocumentValidationOptions = {
  allowed_types?: NebuiaAllowedDocumentType[];
};

export type NebuiaReportValidationOptions = {
  document?: NebuiaDocumentValidationOptions;
};

export type NebuiaCreateReportOptions = {
  steps?: NebuiaStepNames[];
  validation_options?: NebuiaReportValidationOptions;
};
