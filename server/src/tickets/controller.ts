import Ticket from './entity';
import {Get, Post, JsonController, Body, Param} from "routing-controllers";
import {getConnection} from "typeorm";
import Event from "../events/entity";

@JsonController()
export default class TicketController {

    @Post('/events/:id/tickets')
    async createEventsTicket(@Body() ticket:Ticket, @Param('id') id:number){
        const ticketEntity = Ticket.create(ticket);
        await ticketEntity.save();

        const events = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .where("event.id = :id", {id: id})
            .getMany();

        events.map(event => {
            event.tickets = [...event.tickets, ticketEntity];
            const eventEntity = Event.create(event);
            eventEntity.save();
        });

        return events;
    }

    @Get('/events/:id/tickets')
    async getEventsTickets(@Param('id') id:number){
        const events = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .where("event.id = :id", {id: id})
            .getMany();

        return events;
    }
}