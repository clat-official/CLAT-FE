export function getErrorStatus(err: unknown): number | null {
  if (
    err !== null &&
    typeof err === 'object' &&
    'response' in err &&
    err.response !== null &&
    typeof err.response === 'object' &&
    'status' in err.response &&
    typeof (err.response as { status: unknown }).status === 'number'
  ) {
    return (err.response as { status: number }).status
  }
  return null
}

export function getServerErrorMessage(err: unknown): string | null {
  if (
    err !== null &&
    typeof err === 'object' &&
    'response' in err &&
    err.response !== null &&
    typeof err.response === 'object' &&
    'data' in err.response
  ) {
    const data = (err.response as { data: unknown }).data
    if (data !== null && typeof data === 'object' && 'error' in data) {
      const errorField = (data as { error: unknown }).error
      if (
        errorField !== null &&
        typeof errorField === 'object' &&
        'message' in errorField &&
        typeof (errorField as { message: unknown }).message === 'string'
      ) {
        return (errorField as { message: string }).message
      }
    }
  }
  return null
}
