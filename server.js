const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

global.requireFromBase = file => require(path.join(__dirname, file));

const logger = require("./utils/logger");

require("./db");

const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => logger.info(`listening on port ${PORT}`));
