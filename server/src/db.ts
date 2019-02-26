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


//.then(() => console.log('Connected to Postgres with TypeORM'))
