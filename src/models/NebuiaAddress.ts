export interface NebuiaAddressVerifications {
  description?: string;
  status?: boolean;
  note?: string;
}

class NebuiaAddressZone {
  zipCode?: string;
  township?: string;
  townshipType?: string;
  municipality?: string;
  state?: string;
  cpId?: string;
  stateId?: string;
  officeId?: string;
  townshipTypeId?: string;
  municipalityId?: string;
  townshipZipTypeId?: string;
  zone?: string;
}

class NebuiaAddressState {
  completeName?: string;
  abbreviation?: string;
  renapo?: string;
  twoDigits?: string;
  threeDigitsNomenclature?: string;
  key?: string;
}

export interface NebuiaAddress {
  address?: string[];
  verifications?: NebuiaAddressVerifications[];
  zone?: NebuiaAddressZone;
  state?: NebuiaAddressState;
  exact?: boolean;
  valid?: boolean;
}
