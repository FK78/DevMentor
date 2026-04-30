export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

export const routeNotFound = (req, res) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
};
