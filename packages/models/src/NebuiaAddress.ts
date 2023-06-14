import { Optional } from './Common';

export interface NebuiaAddressVerifications {
  description?: Optional<string>;
  status?: Optional<boolean>;
  note?: Optional<string>;
}

class NebuiaAddressZone {
  zipCode?: Optional<string>;
  township?: Optional<string>;
  townshipType?: Optional<string>;
  municipality?: Optional<string>;
  state?: Optional<string>;
  cpId?: Optional<string>;
  stateId?: Optional<string>;
  officeId?: Optional<string>;
  townshipTypeId?: Optional<string>;
  municipalityId?: Optional<string>;
  townshipZipTypeId?: Optional<string>;
  zone?: Optional<string>;
}

class NebuiaAddressState {
  completeName: Optional<string>;
  abbreviation: Optional<string>;
  renapo: Optional<string>;
  twoDigits: Optional<string>;
  threeDigitsNomenclature: Optional<string>;
  key: Optional<string>;
}

export interface NebuiaAddress {
  address?: Optional<string[]>;
  verifications?: Optional<NebuiaAddressVerifications[]>;
  zone?: Optional<NebuiaAddressZone>;
  state?: Optional<NebuiaAddressState>;
  exact?: Optional<boolean>;
  valid?: Optional<boolean>;
}
