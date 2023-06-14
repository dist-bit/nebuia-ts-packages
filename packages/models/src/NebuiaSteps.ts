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
