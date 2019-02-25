"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    cors: true
});
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map