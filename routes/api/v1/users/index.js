const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const logger = requireFromBase("utils/logger");
const User = requireFromBase("db/models/User");

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

router.post(
   "/",
   [check("email").isEmail(), check("password").isLength({ min: 5 })],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         logger.error(errors);
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password: rawPassword } = req.body;

      try {
         const userWithEmail = await User.findOne({ email });
         if (userWithEmail)
            return res
               .status(400)
               .json({ message: "Email address already in use" });

         const encryptedPassword = await bcrypt.hash(rawPassword, 10);

         await User.create({
            email,
            password: encryptedPassword
         });

         return res.status(201).json({ message: "Successfully created user!" });
      } catch (error) {
         logger.error(error);
         return res.status(500).json({ message: "Internal Server Error" });
      }
   }
);

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
