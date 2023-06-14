export interface NebuiaDocumentCheckDigitDocumentNumber {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface NebuiaDocumentCheckDigitDob2 {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface NebuiaDocumentCheckDigitExpiry {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface NebuiaDocumentCheckDigitFinalCheck {
  value?: string;
  hash?: string;
  valid?: boolean;
}

export interface NebuiaDocumentExpiry {
  year?: number;
  month?: string;
  day?: number;
  original?: string;
}

export interface NebuiaDocumentOptional {
  value?: string;
  valid?: boolean;
}

export interface NebuiaDocumentExtra {
  elector_key?: string;
  register_month?: string;
  register_year?: string;
  section?: string;
  validity?: string;
}

export interface NebuiaDocumentValidations {
  register_month_validation?: boolean;
  section_validation?: boolean;
}

export interface NebuiaDocumentNamesDescription {
  father_last_name?: string;
  mother_last_name?: string;
}

export interface NebuiaDocumentCountry {
  abbr?: string;
  full?: string;
}

export interface NebuiaDocumentNationality {
  abbr?: string;
  full?: string;
}

export interface NebuiaDocumentDob {
  year?: number;
  month?: string;
  day?: number;
  original?: string;
}

export interface NebuiaDocumentSex {
  abbr?: string;
  full?: string;
}

export interface NebuiaDocumentCheckDigit {
  document_number?: NebuiaDocumentCheckDigitDocumentNumber;
  dob?: NebuiaDocumentCheckDigitDob2;
  expiry?: NebuiaDocumentCheckDigitExpiry;
  final_check?: NebuiaDocumentCheckDigitFinalCheck;
  valid?: boolean;
}

export interface NebuiaLiveness {
  score?: number;
  status?: boolean;
}

export interface NebuiaFaceMatch {
  similarity?: number;
  status?: boolean;
}

export interface NebuiaDocumentNames {
  last_name?: string;
  names?: string[];
  description?: NebuiaDocumentNamesDescription;
}

export interface NebuiaDocument {
  document_code?: string;
  document_type?: string;
  document_number?: string;
  issuer: string;
  names?: NebuiaDocumentNames;
  country?: NebuiaDocumentCountry;
  nationality?: NebuiaDocumentNationality;
  dob?: NebuiaDocumentDob;
  sex?: NebuiaDocumentSex;
  check_digit?: NebuiaDocumentCheckDigit;
  expiry?: NebuiaDocumentExpiry;
  personal_number?: string;
  address?: string[];
  optionals?: NebuiaDocumentOptional[];
  extra?: NebuiaDocumentExtra;
  validations?: NebuiaDocumentValidations;
}

export interface NebuiaFace {
  liveness?: NebuiaLiveness;
  match?: NebuiaFaceMatch;
}

export interface NebuiaReport {
  id?: string;
  company?: string;
  face?: NebuiaFace;
  document?: NebuiaDocument;
  email?: {
    email: string;
    verified: boolean;
  };
  phone?: {
    phone: string;
    verified: boolean;
  };
}
