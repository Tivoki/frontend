import { HTTPError } from 'ky';

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HTTPError) {
    const data = error.data as { message?: string | string[] } | undefined;
    if (data?.message) {
      const msg = data.message;
      return Array.isArray(msg) ? msg[0] : msg;
    }
    return error.message || 'Something went wrong';
  }
  return 'Something went wrong';
}

/** Machine-readable `code` of a domain error body (e.g. 409 CONVERSATION_CHANGED). */
export function getApiErrorCode(error: unknown): string | undefined {
  if (!(error instanceof HTTPError)) return undefined;
  const data = error.data as { code?: unknown } | undefined;
  return typeof data?.code === 'string' ? data.code : undefined;
}

export function getApiErrorDetails(error: unknown): Record<string, unknown> {
  if (!(error instanceof HTTPError)) return {};
  const data = error.data as { details?: unknown } | undefined;
  return data?.details && typeof data.details === 'object'
    ? (data.details as Record<string, unknown>)
    : {};
}
