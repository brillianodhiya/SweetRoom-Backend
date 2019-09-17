const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.headers["sweet_token"];

  if (!token) return res.sendStatus(401);

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifyToken;
    next();
  } catch {
    res.status(401).send({
      status: 401,
      message: "You Should Register or Login First"
    });
  }
};
