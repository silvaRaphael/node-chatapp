"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./websocket");
const app_1 = require("./app");
const mongoose_1 = require("mongoose");
const port = process.env.PORT || 3000;
const main = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.DB_HOST || '');
        app_1.server.listen(port, () => console.log(`Server is running on port ${port}`));
    }
    catch (error) {
        console.log(error.message);
    }
};
main();
