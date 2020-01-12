const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const User = requireFromBase("db/models/User");
const logger = requireFromBase("utils/logger");

const ONE_DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
const THIRTY_MINUTES_IN_MILLIS = 30 * 60 * 1000;

const loginLimiter = rateLimit({
   windowMs: THIRTY_MINUTES_IN_MILLIS,
   max: 100
});

router.get("/", async (req, res) => {
   try {
      if (!req.user)
         return res.status(404).json({ message: "no current session" });
      else return res.json(req.user);
   } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
   }
});

router.post(
   "/",
   loginLimiter,
   [check("email").exists(), check("password").exists()],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
         const user = await User.findOne({ email });
         if (!user)
            return res
               .status(400)
               .json({ message: "email or password is incorrect" });

         const isCorrectPassword = await bcrypt.compare(
            password,
            user.password
         );
         if (!isCorrectPassword)
            return res
               .status(400)
               .json({ message: "email or password is incorrect" });

         const token = jwt.sign(
            {
               role: user.role,
               id: user.id,
               email: user.email
            },
            process.env.SECRET
         );
         res.cookie(process.env.AUTH_KEY, token, {
            httpOnly: true,
            expires: ONE_DAY_IN_MILLIS
         });
         return res.status(200).json({ token });
      } catch (error) {
         logger.error(error);
         return res.sendStatus(500);
      }
   }
);

router.delete("/:id", (req, res) => {});

module.exports = router;
