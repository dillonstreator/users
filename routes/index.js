const router = require("express").Router();

router.use("/api", require("./api"));
router.use("/health", require("./health"));

module.exports = router;
