import { NebuiaStepNames } from '@nebuia-ts/models';

export type RegisterNebuiaUserDTO = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};
export type CreateNebuiaCompanyDTO = {
  name: string;
  ip: string;
  origin: string;
  steps: NebuiaStepNames[];
  widgetDarkMode: boolean;
};

export type GetCompanyReportsDTO = {
  pagination: {
    page?: number;
    take?: number;
    search?: string;
  };
};

export type UpdateNebuiaCreditDocuments = {
  docs: {
    document_name: string;
    document_type: 'PDF' | 'Image';
  }[];
};
