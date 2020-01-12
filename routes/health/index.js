const router = require("express").Router();

router.get("/", async (_, res) => res.status(200).send("healthy!"));

module.exports = router;
