"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./users/controller");
const controller_2 = require("./login/controller");
const controller_3 = require("./events/controller");
const controller_4 = require("./tickets/controller");
const controller_5 = require("./comments/controller");
const jwt_1 = require("./jwt");
const port = process.env.PORT || 4000;
const app = routing_controllers_1.createKoaServer({
    cors: true,
    controllers: [
        controller_1.default,
        controller_2.default,
        controller_3.default,
        controller_4.default,
        controller_5.default
    ],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            try {
                const verification = !!(token && jwt_1.verify(token));
                const user = jwt_1.verify(token);
                action.request.user = user;
                return verification;
            }
            catch (e) {
                throw new routing_controllers_1.BadRequestError(e);
            }
        }
        return false;
    },
});
db_1.default()
    .then(() => app.listen(port, () => console.log(`Listening on port ${port}`))).catch(err => console.error(err));
//# sourceMappingURL=index.js.map