const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("access_token");
  if (!token) {
    return res.json({ error: "Token not found!! Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token! Access denied" });
  }
};
