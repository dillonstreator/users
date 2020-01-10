const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

// LOGIN
router.post("/", async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await findUserByEmail(email); /* find user by email */
      if (!user)
         return res
            .status(400)
            .json({ message: "email or password is incorrect" });

      const isCorrectPassword = await bcrypt.compare(password, user.password);
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
      return res.status(200).json({ token });
   } catch (error) {
      return res.sendStatus(500);
   }
});

// LOGOUT
router.delete("/:id", (req, res) => {});

module.exports = router;
