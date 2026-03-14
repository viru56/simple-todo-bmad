export function getUserFacingError(err: unknown): string {
  if (err instanceof Error) {
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      return "Couldn't save. Check your connection.";
    }
    if (err.message.includes('Validation failed')) {
      return err.message;
    }
    const body = (err as Error & { body?: { error?: { message?: string } } })
      .body;
    if (body?.error?.message) {
      return body.error.message;
    }
    return err.message;
  }
  return 'An unexpected error occurred. Please try again.';
}
