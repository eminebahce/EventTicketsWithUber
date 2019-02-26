import Event from './entity';
//import Ticket from '../tickets/entity';
import {Get, Post, JsonController, Body, Param} from "routing-controllers";
import {getConnection} from "typeorm";
import User from "../users/entity";

@JsonController()
export default class EventController {

    @Get('/events')
    async getEvents(){
        const events = await Event.find()
        return {events}
    }

    @Post('/events')
    async createEvents(@Body() event: Event){
        const eventEntity = Event.create(event)
        await eventEntity.save()
    }

    //o event'in ticketları:
    @Get('/events/:id/tickets')
    async getEventsTickets(@Param('id') id:number){
    //const eventById = await getConnection().manager.findOne(Event, id)
        const eventsTickets = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "tickets")
            //.leftJoinAndSelect("ticket.comments", "comment")
            .relation(Event, "tickets")
            .of(id).loadMany()
            //.where("event.id = :id", {id})
            //.getMany();
        console.log('XXXXXXX', eventsTickets);
        return eventsTickets
        //eventsTickets.map(tickets => Object.keys(tickets).map(ticket => console.log(ticket)))


           /*const eventsUser = await getConnection()
            .getRepository(User)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.user", "user")
            .where("event.id = :id", {id})
            .getOne();

        return eventsUser*/

    }
}


/**
 *   @Get('/events/:id/tickets')
 async getEventsTickets(@Param('id') id:number){
        const eventById = await Event.find({
            join: {
                alias: "event",
                leftJoinAndSelect: {
                    id: "event.id",
                    tickets: "event.tickets",
                    comments: "event.comments"
                }
            }
        })
        return {eventById}
    }
 */