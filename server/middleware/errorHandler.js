export function notFound(request, response) {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.path}` });
}

export function errorHandler(error, _request, response, _next) {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return response.status(400).json({ message: error.message });
  }
  if (error instanceof SyntaxError && "body" in error) {
    return response.status(400).json({ message: "Request body must be valid JSON." });
  }
  console.error(error);
  return response.status(500).json({ message: "An unexpected server error occurred." });
}
