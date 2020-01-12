const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

module.exports = (req, _, next) => {
   req.user = null;
   const token =
      req.cookies[process.env.AUTH_KEY] || req.header(process.env.AUTH_KEY);

   if (!token) return next();
   try {
      const user = jwt.verify(token, process.env.SECRET);
      req.user = user;
   } catch (error) {
      logger.error(error);
   } finally {
      next();
   }
};
