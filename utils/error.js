export const getErrorMessage = (payload, errorMessage) => {
  if (payload && payload.status_code) {
    switch (payload.status_code) {
      case 200:
        return null
      default:
        return payload.status_text || errorMessage
    }
  }
}
