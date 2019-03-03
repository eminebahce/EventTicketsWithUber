import Ticket from './entity';
import {Get, Post, JsonController, Body, Param, Put, NotFoundError, Delete, Authorized, Req} from "routing-controllers";
import {getConnection} from "typeorm";
import Event from "../events/entity";
import User from "../users/entity";

@JsonController()
export default class TicketController {

    @Authorized()
    @Post('/events/:eventId/tickets')
    async createEventsTicket(@Body() ticket:Ticket, @Param('eventId') eventId:number, @Req() request:any){

        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .where("user.id = :id", {id: request.user.id})
            .andWhere("event.id = :eventId", {eventId: eventId})
            .getOne()

        if(user) {
            ticket.createDate = new Date();
            ticket.user = user;
            const ticketEntity = Ticket.create(ticket);
            const savedTicket = await ticketEntity.save();

            user.events.map(event => {
                event.tickets = [...event.tickets, ticketEntity];
                const eventEntity = Event.create(event);
                eventEntity.save();
            });
            return savedTicket;
        }
        return "";
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

    @Authorized()
    @Put('/events/:eventId/tickets/:ticketId')
    async updateTicket(@Param('eventId') eventId:number, @Param('ticketId') ticketId:number, @Body() update:Partial<Ticket>, @Req() request:any){
        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .where("user.id = :id", {id: request.user.id})
            .andWhere("event.id = :eventId", {eventId: eventId})
            .andWhere("ticket.id = :ticketId", {ticketId:ticketId})
            .getOne()

        if(user) {
            const ticket = user.events[0].tickets[0];
            if (!ticket) {
                throw new NotFoundError('Can not find ticket');
            } else {
                return Ticket.merge(ticket, update).save();
            }
        }
        return "";
    }

    @Authorized()
    @Delete('/events/:eventId/tickets/:ticketId')
    async deleteTicket(@Param('eventId') eventId:number,@Param('ticketId') ticketId:number, @Req() request:any){

        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .where("user.id = :id", {id: request.user.id})
            .andWhere("event.id = :eventId", {eventId: eventId})
            .andWhere("ticket.id = :ticketId", {ticketId:ticketId})
            .getOne();

        if(!user||user.events.length === 0 || user.events[0].tickets.length === 0 ){
            throw new NotFoundError('Can not find ticket');
        } else {
            return Ticket.delete(user.events[0].tickets[0]);
        }
    }
}