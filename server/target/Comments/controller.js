"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const entity_2 = require("../events/entity");
const entity_3 = require("../tickets/entity");
const fraudCalculation_1 = require("../fraudCalculation");
const entity_4 = require("../users/entity");
let CommentController = class CommentController {
    async getEventsTicketsComments(eventId, ticketId) {
        const events = await typeorm_1.getConnection()
            .getRepository(entity_2.default)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .where("event.id = :eventId", { eventId })
            .andWhere("ticket.id = :ticketId", { ticketId })
            .getMany();
        let risk = 0;
        if (events.length == 1) {
            risk = await fraudCalculation_1.default(ticketId, eventId);
        }
        return events.map(event => {
            return { 'ticket': event.tickets, 'risk': risk };
        });
    }
    async createEventsTicketsComments(comment, eventId, ticketId, request) {
        const user = await typeorm_1.getConnection()
            .getRepository(entity_4.default)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .where("user.id = :id", { id: request.user.id })
            .getOne();
        const event = await typeorm_1.getConnection()
            .getRepository(entity_2.default)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .andWhere("event.id = :eventId", { eventId: eventId })
            .andWhere("ticket.id = :ticketId", { ticketId })
            .getOne();
        if (user && event) {
            comment.createDate = new Date();
            comment.user = user;
            const commentEntity = entity_1.default.create(comment);
            const savedComment = await commentEntity.save();
            await Promise.all(event.tickets.map(async (ticket) => {
                ticket.comments = [...ticket.comments, savedComment];
                const ticketEntity = entity_3.default.create(ticket);
                await ticketEntity.save();
            }));
            let risk = 0;
            if (event) {
                risk = await fraudCalculation_1.default(ticketId, eventId);
            }
            const events = await typeorm_1.getConnection()
                .getRepository(entity_2.default)
                .createQueryBuilder("event")
                .leftJoinAndSelect("event.tickets", "ticket")
                .leftJoinAndSelect("ticket.comments", "comment")
                .where("event.id = :eventId", { eventId })
                .andWhere("ticket.id = :ticketId", { ticketId })
                .getMany();
            return events.map(event => {
                return { 'ticket': event.tickets, 'risk': risk };
            });
        }
        return "";
    }
    async deleteComment(commentId, eventId, ticketId, request) {
        const user = await typeorm_1.getConnection()
            .getRepository(entity_4.default)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.comments", "comment")
            .where("user.id = :id", { id: request.user.id })
            .andWhere("comment.id = :commentId", { commentId: commentId })
            .getOne();
        const event = await typeorm_1.getConnection()
            .getRepository(entity_2.default)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.comments", "comment")
            .andWhere("ticket.id = :ticketId", { ticketId: ticketId })
            .andWhere("comment.id = :commentId", { commentId: commentId })
            .getOne();
        if (!user || !event || event.tickets.length === 0 || event.tickets[0].comments.length === 0) {
            throw new routing_controllers_1.NotFoundError('Can not find comment');
        }
        else {
            await entity_1.default.delete(event.tickets[0].comments[0]);
            let risk = 0;
            if (event) {
                risk = await fraudCalculation_1.default(ticketId, eventId);
            }
            const events = await typeorm_1.getConnection()
                .getRepository(entity_2.default)
                .createQueryBuilder("event")
                .leftJoinAndSelect("event.tickets", "ticket")
                .leftJoinAndSelect("ticket.comments", "comment")
                .where("event.id = :eventId", { eventId })
                .andWhere("ticket.id = :ticketId", { ticketId })
                .getMany();
            return events.map(event => {
                return { 'ticket': event.tickets, 'risk': risk };
            });
        }
    }
};
__decorate([
    routing_controllers_1.Get('/events/:eventId/tickets/:ticketId/comments'),
    __param(0, routing_controllers_1.Param('eventId')), __param(1, routing_controllers_1.Param('ticketId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getEventsTicketsComments", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/events/:eventId/tickets/:ticketId/comments'),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Param('eventId')),
    __param(2, routing_controllers_1.Param('ticketId')),
    __param(3, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createEventsTicketsComments", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete('/events/:eventId/tickets/:ticketId/comments/:commentId'),
    __param(0, routing_controllers_1.Param('commentId')),
    __param(1, routing_controllers_1.Param('eventId')),
    __param(2, routing_controllers_1.Param('ticketId')),
    __param(3, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
CommentController = __decorate([
    routing_controllers_1.JsonController()
], CommentController);
exports.default = CommentController;
//# sourceMappingURL=controller.js.map