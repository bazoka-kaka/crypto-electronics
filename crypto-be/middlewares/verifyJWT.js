const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const headers = req.headers.Authorization || req.headers.authorization;
  if (!headers?.includes("Bearer ")) return res.sendStatus(401);
  const token = headers.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
