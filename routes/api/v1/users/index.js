const router = require("express").Router();

/**
 * returns list of all users paginated with skip and limit parameters
 */
router.get("/", (req, res) => {
   const { skip = 0, limit = 10 } = req.query;
   const tooManyUsersRequested = limit > process.env.MAX_USER_RETRIEVAL;
   if (tooManyUsersRequested)
      return res.status(400).json({
         message: `Maximum user retrieval per page is ${process.env.MAX_USER_RETRIEVAL}. The 'limit' query parameter must not exceed this value.`
      });

   // TODO: query users

   return res.status(200).send("users");
});

router.post("/", (req, res) => {
   const { email, password } = req.body;
   
});

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
