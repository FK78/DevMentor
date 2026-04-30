import jsonwebtoken from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;
  try {
    req.user = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};
