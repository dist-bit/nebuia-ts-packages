import { NebuiaDocument, NebuiaReport } from './NebuiaReport';

export const ReportValidity = {
  REJECTED: 'REJECTED',
  DANGER: 'DANGER',
  SUCCESS: 'SUCCESS',
} as const;
export type ReportValidity = keyof typeof ReportValidity;

export interface ReportSummaryInfo {
  spoofing: boolean;
  match: boolean;
  verifications: boolean;
  frontAndBack: { apply: boolean; status: boolean };
  document?: NebuiaDocument;
}

const getLabels = (docStatus: ReportValidity) => {
  let statusText = 'Documento rechazado';
  if (docStatus === ReportValidity.SUCCESS) {
    statusText = 'Documento validado';
  } else if (docStatus === ReportValidity.DANGER) {
    statusText = 'El documento requiere revisión manual';
  }

  let statusSummary =
    'El proceso no cumple los requisitos de validación de identidad, recomendando su total rechazo.';

  if (docStatus === ReportValidity.SUCCESS) {
    statusSummary =
      'Todas las comprobaciones se realizaron correctamente y el documento cumplía los filtros de seguridad.';
  } else if (docStatus === ReportValidity.DANGER) {
    statusSummary =
      'La verificación superó la mayoría de las pruebas, pero será necesaria una revisión manual por la seguridad del usuario.';
  }

  return {
    status: docStatus,
    title: statusText,
    summary: `${statusSummary}`,
  };
};

export const checkNebuiaReportValidity = (
  document: NebuiaReport,
): { status: ReportValidity; title: string; summary: string } => {
  const summary: ReportSummaryInfo = {
    document: document.document,
    frontAndBack: {
      apply: document.document?.document_type === 'Identification',
      status: !!document.document?.check_digit?.valid,
    },
    spoofing: false,
    match: false,
    verifications: !!document.document?.check_digit?.valid,
  };

  if (document.face?.match) {
    summary.match = !!document.face.match.status;
  }

  if (document.face?.liveness) {
    summary.spoofing = !!document.face.liveness.status;
  }

  // Fill summary

  let docStatus: ReportValidity = ReportValidity.REJECTED;

  if (summary.frontAndBack.apply) {
    docStatus = summary.frontAndBack.status
      ? ReportValidity.SUCCESS
      : ReportValidity.DANGER;
  }

  if (!summary.verifications) {
    docStatus = ReportValidity.DANGER;
  }

  if (summary.spoofing && summary.match) {
    if (
      docStatus !== ReportValidity.DANGER &&
      docStatus !== ReportValidity.REJECTED
    ) {
      docStatus = ReportValidity.SUCCESS;
    }
  } else {
    docStatus = ReportValidity.REJECTED;
  }

  return getLabels(docStatus);
};
