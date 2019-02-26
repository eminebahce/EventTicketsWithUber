"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const DefaultNamingStrategy_1 = require("typeorm/naming-strategy/DefaultNamingStrategy");
const StringUtils_1 = require("typeorm/util/StringUtils");
const entity_1 = require("./users/entity");
const entity_2 = require("./tickets/entity");
const entity_3 = require("./comments/entity");
const entity_4 = require("./events/entity");
class CustomNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    tableName(targetName, userSpecifiedName) {
        return userSpecifiedName ? userSpecifiedName : StringUtils_1.snakeCase(targetName) + 's';
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        return StringUtils_1.snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
    }
    columnNameCustomized(customName) {
        return customName;
    }
    relationName(propertyName) {
        return StringUtils_1.snakeCase(propertyName);
    }
}
exports.default = () => typeorm_1.createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres',
    entities: [
        entity_1.default,
        entity_2.default,
        entity_3.default,
        entity_4.default
    ],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
})
    .then(async (connection) => {
    console.log('Connected to Postgres with TypeORM');
    const users = await connection
        .getRepository(entity_1.default)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.events", "event")
        .leftJoinAndSelect("event.tickets", "ticket")
        .leftJoinAndSelect("ticket.comments", "comment")
        .where("comment.id = :id", { id: 1 })
        .getMany();
    users.map(user => user.events.forEach(event => event.tickets.forEach(ticket => console.log(ticket.comments))));
}).catch(error => console.log("Error: ", error));
//# sourceMappingURL=db.js.map