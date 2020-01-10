const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");

module.exports = (req, res, next) => {
   req.user = null;
   const token = req.cookies[process.env.AUTH_COOKIE_KEY];

   if (!token) return next();
   try {
      const user = jwt.verify(token, process.env.SECRET);
      req.user = user;
   } catch (error) {
      logger.error(error, { req });
   } finally {
      next();
   }
};
