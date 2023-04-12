const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) !== -1) {
    req.header("Access-Control-Allow-Origin", true);
  }
  next();
};

module.exports = credentials;
