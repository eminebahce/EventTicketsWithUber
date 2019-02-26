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
    const comment1 = new entity_3.default();
    comment1.text = "Cool ticket";
    comment1.createDate = new Date();
    await connection.manager.save(comment1);
    const comment2 = new entity_3.default();
    comment2.text = "Good ticket";
    comment2.createDate = new Date();
    await connection.manager.save(comment2);
    const comment3 = new entity_3.default();
    comment3.text = "Bad ticket";
    comment3.createDate = new Date();
    await connection.manager.save(comment3);
    const comment4 = new entity_3.default();
    comment4.text = "Worst ticket";
    comment4.createDate = new Date();
    await connection.manager.save(comment4);
    const ticket1 = new entity_2.default();
    ticket1.description = "Early Bird";
    ticket1.picture = "picture";
    ticket1.price = 4;
    ticket1.endDate = new Date();
    ticket1.comments = [comment1, comment3];
    await connection.manager.save(ticket1);
    const ticket2 = new entity_2.default();
    ticket2.description = "Day Bird";
    ticket2.picture = "picture";
    ticket2.price = 10;
    ticket2.endDate = new Date();
    ticket2.comments = [comment2, comment4];
    await connection.manager.save(ticket2);
    const event = new entity_4.default();
    event.name = "Go to";
    event.description = "Development Conference";
    event.picture = "picture";
    event.startDate = new Date();
    event.endDate = new Date();
    event.tickets = [ticket1, ticket2];
    await connection.manager.save(event);
    const user = new entity_1.default();
    user.userType = "admin";
    user.events = [event];
    user.tickets = [ticket1, ticket2];
    user.comments = [comment1, comment2, comment3, comment4];
    await connection.manager.save(user);
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