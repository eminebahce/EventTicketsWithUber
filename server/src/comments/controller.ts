import Comment from './entity';
import {Get, Post, JsonController, Body, Param} from "routing-controllers";
import {getConnection} from "typeorm";
import Event from "../events/entity";

@JsonController()
export default class CommentController {

    @Get('/events/:eventId/tickets/:ticketId/comments')
    async getEventsTicketsComments(@Param('eventId') eventId:number, @Param('ticketId') ticketId:number){
        const events = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .where("event.id = :eventId", {eventId})
            .andWhere("ticket.id = :ticketId", {ticketId})
            .getMany();

        return events.map(event => event.tickets);
    }

    @Post('/events/:eventId/tickets/:ticketId/comments')
    async createEventsTicketsComments(@Body() comment:Comment, @Param('eventId') eventId:number, @Param('ticketId') ticketId:number){
        const commentEntity = Comment.create(comment);
        await commentEntity.save();

        const events = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .where("event.id = :eventId", {eventId})
            .andWhere("ticket.id = :ticketId", {ticketId})
            .getMany();

        events.map(event => {
            event.tickets.map(ticket => {
                ticket.comments = [...ticket.comments, commentEntity];
                const ticketEntity = Event.create(ticket);
                ticketEntity.save();
            })
        })
        return events.map(event => event.tickets);
    }
}