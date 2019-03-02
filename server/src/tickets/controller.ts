import Ticket from './entity';
import {Get, Post, JsonController, Body, Param, Put, NotFoundError, Delete} from "routing-controllers";
import {getConnection} from "typeorm";
import Event from "../events/entity";

@JsonController()
export default class TicketController {

    @Post('/events/:id/tickets')
    async createEventsTicket(@Body() ticket:Ticket, @Param('id') id:number){
        ticket.createDate = new Date();
        const ticketEntity = Ticket.create(ticket);
        const savedTicket = await ticketEntity.save();

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

        return savedTicket;
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

    @Put('/events/:eventId/tickets/:id')
    async updateTicket(@Param('id') id:number, @Body() update:Partial<Ticket>){
        //console.log(update);
        const ticket = await Ticket.findOne(id)
        if(!ticket){
            throw new NotFoundError('Can not find ticket');
        } else {
            return Ticket.merge(ticket, update).save();
        }
    }

    @Delete('/events/:eventId/tickets/:id')
    async deleteTicket(@Param('id') id:number){
        const deleteTicket = await Ticket.findOne(id)
        if(!deleteTicket){
            throw new NotFoundError('Can not find ticket');
        } else {
            return Ticket.delete(deleteTicket)
        }
    }
}