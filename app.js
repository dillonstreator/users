const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rTracer = require("cls-rtracer");
const helmet = require("helmet");
const logger = require("./utils/logger");

const app = express();

app.use(helmet());
app.use(rTracer.expressMiddleware());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require("./middlewares/extractUser"));

app.use((req, _, next) => {
   logger.info(`${req.method} ${req.url}`);
   next();
});

app.use(require("./routes"));

module.exports = app;