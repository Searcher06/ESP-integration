export const errorMiddleware = (err, req, res, next) => {
  console.log(
    `\nError from ${req.method} ${req.url}\nHere is the error:`,
    err.code || err.message
  );

  if (err.response) {
    if (err.response.status === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired API key",
      });
    }

    if (err.response.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }

    return res.status(err.response.status).json({
      success: false,
      message: err.response.data?.message || "ESP API returned an error",
    });
  }

  // No response received (network issue, DNS, timeout
  if (err.request) {
    const networkErrors = ["ECONNRESET", "ENOTFOUND", "ETIMEDOUT", "EAI_AGAIN"];

    if (networkErrors.includes(err.code)) {
      return res.status(503).json({
        success: false,
        message:
          "Network error: Unable to reach ESP servers. Please check your internet connection.",
      });
    }

    return res.status(503).json({
      success: false,
      message: "ESP server not reachable. Please try again later.",
    });
  }

  //  Fallback error handler
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong!",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
