import {createConnection} from "typeorm"
import 'reflect-metadata';
import {DefaultNamingStrategy} from 'typeorm/naming-strategy/DefaultNamingStrategy'
import {NamingStrategyInterface} from 'typeorm/naming-strategy/NamingStrategyInterface'
import {snakeCase} from "typeorm/util/StringUtils"
import User from './users/entity'
import Ticket from './tickets/entity';
import Comment from './comments/entity';
import Event from './events/entity';


class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface{

    tableName(targetName: string, userSpecifiedName: string | undefined): string {
        return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's';
    }

    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
    }

    columnNameCustomized(customName: string): string {
        return customName;
    }

    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }
}

export default () => createConnection({
    type:"postgres",
    url: process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres',
    entities:[
        User,
        Ticket,
        Comment,
        Event
    ],
    synchronize: true,
    logging: true,
    namingStrategy: new CustomNamingStrategy()
})
.then(async connection => {
  console.log('Connected to Postgres with TypeORM')

    const comment1 = new Comment();
    comment1.text = "Cool ticket";
    comment1.createDate = new Date();
    await connection.manager.save(comment1);

    const comment2 = new Comment();
    comment2.text = "Good ticket";
    comment2.createDate = new Date();
    await connection.manager.save(comment2);

    const comment3 = new Comment();
    comment3.text = "Bad ticket";
    comment3.createDate = new Date();
    await connection.manager.save(comment3);

    const comment4 = new Comment();
    comment4.text = "Worst ticket";
    comment4.createDate = new Date();
    await connection.manager.save(comment4);

    const ticket1 = new Ticket();
    ticket1.description = "Early Bird";
    ticket1.picture = "picture";
    ticket1.price = 4;
    ticket1.endDate = new Date();
    ticket1.createDate = new Date();
    ticket1.comments = [comment1, comment3];
    await connection.manager.save(ticket1);

    const ticket2 = new Ticket();
    ticket2.description = "Day Bird";
    ticket2.picture = "picture";
    ticket2.price = 10;
    ticket2.endDate = new Date();
    ticket2.createDate = new Date();
    ticket2.comments = [comment2, comment4];
    await connection.manager.save(ticket2);

    const event = new Event();
    event.name = "Go to";
    event.description = "Development Conference";
    event.picture = "picture";
    event.startDate = new Date();
    event.endDate = new Date();
    event.createDate = new Date();
    event.tickets = [ticket1, ticket2];
    await connection.manager.save(event);

    const user = new User();
    //user.name = "Emine Bahce Cizer Can Cizer";
    user.userType = "admin";
    user.events = [event];
    user.tickets = [ticket1, ticket2];
    user.comments = [comment1, comment2, comment3, comment4];
    await connection.manager.save(user);


    const users = await connection
       .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.events", "event")
        .leftJoinAndSelect("event.tickets", "ticket")
        .leftJoinAndSelect("ticket.comments", "comment")
        .where("comment.id = :id", {id : 1})
        .getMany();

    users.map(user => user.events.forEach(event => event.tickets.forEach(ticket => console.log(ticket.comments))));
}).catch(error => console.log("Error: ", error));

