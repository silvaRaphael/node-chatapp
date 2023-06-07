"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require("./websocket");
const express_1 = __importDefault(require("express"));
const node_http_1 = __importDefault(require("node:http"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const configs_1 = require("./utils/configs");
const app = (0, express_1.default)();
const server = node_http_1.default.createServer(app);
exports.server = server;
app.use((0, cors_1.default)(configs_1.corsOptions));
app.use(express_1.default.json());
app.use(routes_1.routes);
