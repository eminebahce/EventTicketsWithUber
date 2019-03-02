import Comment from './entity';
import {Get, Post, JsonController, Body, Param, Delete, NotFoundError} from "routing-controllers";
import {getConnection} from "typeorm";
import Event from "../events/entity";
import Ticket from "../tickets/entity";
import fraudCalculation from '../fraudCalculation';

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

        let risk = 0;
        //console.log(risk);

        if(events.length == 1){
            risk = await fraudCalculation(ticketId, eventId);
            //console.log("GET " +risk);
        }

        return events.map(event => {
            return {'ticket':event.tickets, 'risk':risk};
        });
    }

    @Post('/events/:eventId/tickets/:ticketId/comments')
    async createEventsTicketsComments(@Body() comment:Comment, @Param('eventId') eventId:number, @Param('ticketId') ticketId:number){
        comment.createDate = new Date();
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

        await Promise.all(events.map(async event => {
            await Promise.all(event.tickets.map(async ticket => {
                ticket.comments = [...ticket.comments, commentEntity];
                const ticketEntity = Ticket.create(ticket);
                await ticketEntity.save();
            }))
        }));

        let risk = 0;
        //console.log(risk);

        if(events.length == 1){
            risk = await fraudCalculation(ticketId, eventId);
            //console.log("POST: " + risk);
        }

        return events.map(event => {return {'ticket': event.tickets, 'risk': risk}});
    }

    @Delete('/events/:eventId/tickets/:ticketId/comments/:commentId')
    async deleteComment(@Param('commentId') commentId:number, @Param('eventId') eventId: number, @Param('ticketId') ticketId: number){
        const deleteComment = await Comment.findOne(commentId)
        if(!deleteComment){
            throw new NotFoundError('Can not find comment');
        } else {
            await Comment.delete(deleteComment);
        }

        const events = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .where("event.id = :eventId", {eventId})
            .andWhere("ticket.id = :ticketId", {ticketId})
            .getMany();

        let risk = 0;
        //console.log(risk);

        if(events.length == 1){
            risk = await fraudCalculation(ticketId, eventId);
            //console.log("Delete" + risk);
        }

        return events.map(event => {
            return {'ticket':event.tickets, 'risk':risk};
        });
    }
}