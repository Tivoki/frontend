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
