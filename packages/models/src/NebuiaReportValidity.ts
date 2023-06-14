export const ReportValidity = {
  REJECTED: 'REJECTED',
  DANGER: 'DANGER',
  SUCCESS: 'SUCCESS',
} as const;
export type ReportValidity = keyof typeof ReportValidity;
