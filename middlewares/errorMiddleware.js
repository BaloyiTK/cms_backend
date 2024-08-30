const errorHandler = (err, req, res, next) => {
  const statusCode = res && res.statusCode ? res.statusCode : 500;
  if (res) {
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
};

export default errorHandler
