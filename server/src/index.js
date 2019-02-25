"use strict";
exports.__esModule = true;
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
//import setupDb from './db';
var port = process.env.PORT || 4000;
var app = routing_controllers_1.createKoaServer({
    cors: true
});
/**setupDb()
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`))
        .catch(err => console.error(err)));
 */
app.listen(port, function () { return console.log("Listening on port " + port); });
