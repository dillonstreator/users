const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const logger = require("./utils/logger");

const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => logger.info(`listening on port ${PORT}`));
