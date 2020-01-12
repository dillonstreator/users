const logger = rootRequire("utils/logger");
const _get = require("lodash.get");

module.exports = (...permittedRoles) => {
   return (req, res, next) => {
      const userId = _get(req, ["user", "id"]);
      if (!userId) {
         logger.info(`Unauthorized user attempted to access route...`);
         return res.sendStatus(401);
      }

      const myRole = _get(req, ["user", "role"]);

      const actionPermitted = permittedRoles.includes(myRole);
      if (!actionPermitted) {
         logger.info(
            `userId: ${userId} attempted to access a role restricted route!`
         );
         return res.sendStatus(403);
      }

      next();
   };
};
