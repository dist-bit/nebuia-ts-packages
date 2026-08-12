import { NebuiaAddress } from './NebuiaAddress';

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
  is_valid_for_kyc?: boolean;
}

export interface NebuiaLivenessEvidence {
  depth_loss?: string;
  detail_degradation?: string;
  overall_quality?: string;
  material_appearance?: string;
  life_signs?: string;
}

export interface NebuiaLivenessAccessories {
  has_glasses?: boolean;
  has_mask?: boolean;
  has_cap?: boolean;
  has_hat?: boolean;
  detected?: boolean;
  reject_reason?: string;
}

export interface NebuiaLivenessScoring {
  liveness_score?: number;
  attack_score?: number;
}

export interface NebuiaLivenessAnalysisChain {
  step1_medium?: string;
  step2_approach?: string;
  step3_mask?: string;
  step4_ai?: string;
  step5_depth?: string;
  step6_liveness?: string;
  step7_accessories?: string;
}

export interface NebuiaLivenessResult {
  score: number;
  status: boolean;
  evidence: NebuiaLivenessEvidence;
  indicators: string[];
  accessories?: NebuiaLivenessAccessories | null;
}

export interface NebuiaLivenessDetail extends NebuiaLivenessResult {
  is_spoofing?: boolean;
  is_valid_for_kyc?: boolean;
  type_of_spoof?: string;
  rejection_reason?: string | null;
  analysis_chain?: NebuiaLivenessAnalysisChain;
  scoring?: NebuiaLivenessScoring;
}

export interface NebuiaPassiveSignals {
  session_id: string;
  blinkCount: number;
  blinkTimestamps: number[];
  avgBlinkDurationMs: number;
  mouthMovements: number;
  headVarianceX: number;
  headVarianceY: number;
  irisVarianceX: number;
  irisVarianceY: number;
  sessionDurationMs: number;
  frameCount: number;
  avgEAR: number;
}

export interface NebuiaFaceMatch {
  similarity?: number;
  status?: boolean;
}

export type NebuiaFaceIdStatus =
  | {
      complete: false;
      face: boolean;
      id: boolean;
    }
  | {
      complete: true;
      face_image: string;
      document_image: string;
      liveness: NebuiaLivenessDetail;
      match: NebuiaFaceMatch;
    };

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

export interface NebuiaOtp {
  secret?: string;
}

export interface NebuiaReport {
  id: string;
  company: string;
  face?: NebuiaFace;
  document?: NebuiaDocument;
  address?: NebuiaAddress;
  otp?: NebuiaOtp;
  email?: {
    email: string;
    verified: boolean;
  };
  phone?: {
    phone: string;
    verified: boolean;
  };
}
