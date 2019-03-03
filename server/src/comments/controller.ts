import Comment from './entity';
import {Get, Post, JsonController, Body, Param, Delete, NotFoundError, Authorized, Req} from "routing-controllers";
import {getConnection} from "typeorm";
import Event from "../events/entity";
import Ticket from "../tickets/entity";
import fraudCalculation from '../fraudCalculation';
import User from "../users/entity";

@JsonController()
export default class CommentController {

    @Get('/events/:eventId/tickets/:ticketId/comments')
    async getEventsTicketsComments(@Param('eventId') eventId: number, @Param('ticketId') ticketId: number) {
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

        if (events.length == 1) {
            risk = await fraudCalculation(ticketId, eventId);
            //console.log("GET " +risk);
        }

        return events.map(event => {
            return {'ticket': event.tickets, 'risk': risk};
        });
    }

    @Authorized()
    @Post('/events/:eventId/tickets/:ticketId/comments')
    async createEventsTicketsComments(@Body() comment: Comment,
                                      @Param('eventId') eventId: number,
                                      @Param('ticketId') ticketId: number,
                                      @Req() request: any) {

        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .where("user.id = :id", {id: request.user.id})
            .getOne()

        const event = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .andWhere("event.id = :eventId", {eventId: eventId})
            .andWhere("ticket.id = :ticketId", {ticketId})
            .getOne()

        if (user && event) {
            comment.createDate = new Date();
            comment.user = user;
            const commentEntity = Comment.create(comment);
            const savedComment = await commentEntity.save();

            await Promise.all(event.tickets.map(async ticket => {
                ticket.comments = [...ticket.comments, savedComment];
                const ticketEntity = Ticket.create(ticket);
                await ticketEntity.save();
            }));

            let risk = 0;
            //console.log(risk);

            if (event) {
                risk = await fraudCalculation(ticketId, eventId);
                //console.log("POST: " + risk);
            }

            const events = await getConnection()
                .getRepository(Event)
                .createQueryBuilder("event")
                .leftJoinAndSelect("event.tickets", "ticket")
                .leftJoinAndSelect("ticket.comments", "comment")
                .where("event.id = :eventId", {eventId})
                .andWhere("ticket.id = :ticketId", {ticketId})
                .getMany();

            return events.map(event => {
                return {'ticket': event.tickets, 'risk': risk};
            });
        }
        return "";
    }

    @Authorized()
    @Delete('/events/:eventId/tickets/:ticketId/comments/:commentId')
    async deleteComment(@Param('commentId') commentId: number,
                        @Param('eventId') eventId: number,
                        @Param('ticketId') ticketId: number,
                        @Req() request: any) {

        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.comments", "comment")
            .where("user.id = :id", {id: request.user.id})
            .andWhere("comment.id = :commentId", {commentId: commentId})
            .getOne()

        const event = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .andWhere("ticket.id = :ticketId", {ticketId: ticketId})
            .andWhere("comment.id = :commentId", {commentId: commentId})
            .getOne()

        if (!user || !event || event.tickets.length === 0 || event.tickets[0].comments.length === 0) {
            throw new NotFoundError('Can not find comment');
        } else {
            await Comment.delete(event.tickets[0].comments[0]);
            let risk = 0;
            //console.log(risk);

            if (event) {
                risk = await fraudCalculation(ticketId, eventId);
                //console.log("Delete" + risk);
            }

            const events = await getConnection()
                .getRepository(Event)
                .createQueryBuilder("event")
                .leftJoinAndSelect("event.tickets", "ticket")
                .leftJoinAndSelect("ticket.comments", "comment")
                .where("event.id = :eventId", {eventId})
                .andWhere("ticket.id = :ticketId", {ticketId})
                .getMany();

            return events.map(event => {
                return {'ticket': event.tickets, 'risk': risk};
            });
        }
    }
}