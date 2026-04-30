export const validate = (requiredFields) => (req, res, next) => {
  const missing = requiredFields.filter((f) => !req.body[f]);
  if (missing.length) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missing.join(", ")}` });
  }
  next();
};

export const validateSensitive = (requiredFields) => (req, res, next) => {
  const missing = requiredFields.filter((f) => !req.body[f]);
  if (missing.length) {
    return res.status(400).json({ error: "Invalid request" });
  }
  next();
};
