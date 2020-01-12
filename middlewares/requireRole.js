const logger = rootRequire("utils/logger");
const _get = require("lodash.get");

module.exports = (...permittedRoles) => {
   return (req, res, next) => {
      const myRole = _get(req, ["user", "role"]);

      const actionPermitted = permittedRoles.includes(myRole);
      if (!actionPermitted) {
         logger.info(
            `userId: ${req.user.id} attempted to access a role restricted route!`
         );
         return res.sendStatus(403);
      }

      next();
   };
};
