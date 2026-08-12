import { NebuiaCreateReportOptions } from '../../../models';

/**
 * Builds the body for `POST services/report`, omitting empty values so the
 * request stays identical to the previous behaviour when no options are given.
 */
export function parseCreateReportOptions(
  arg0?: NebuiaCreateReportOptions,
): NebuiaCreateReportOptions | undefined {
  if (!arg0) {
    return undefined;
  }

  const { steps, validation_options: validationOptions } = arg0;
  const body: NebuiaCreateReportOptions = {};

  if (steps?.length) {
    body.steps = steps;
  }

  const allowedTypes = validationOptions?.document?.allowed_types;
  if (allowedTypes?.length) {
    body.validation_options = {
      ...validationOptions,
      document: { ...validationOptions?.document, allowed_types: allowedTypes },
    };
  }

  return Object.keys(body).length ? body : undefined;
}
