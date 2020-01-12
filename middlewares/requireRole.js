const logger = requireFromBase("utils/logger");

module.exports = (...roles) => {
   return (req, res, next) => {
      const actionPermitted = roles.includes(req.user.role);
      if (!actionPermitted) {
         logger.info(
            `userId: ${req.user.id} attempted to access a role restricted route!`
         );
         return res.sendStatus(403);
      }

      next();
   };
};
