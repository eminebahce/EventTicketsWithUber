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
let TicketController = class TicketController {
    async createEventsTicket(ticket, id) {
        ticket.createDate = new Date();
        const ticketEntity = entity_1.default.create(ticket);
        const savedTicket = await ticketEntity.save();
        const events = await typeorm_1.getConnection()
            .getRepository(entity_2.default)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .where("event.id = :id", { id: id })
            .getMany();
        events.map(event => {
            event.tickets = [...event.tickets, ticketEntity];
            const eventEntity = entity_2.default.create(event);
            eventEntity.save();
        });
        return savedTicket;
    }
    async getEventsTickets(id) {
        const events = await typeorm_1.getConnection()
            .getRepository(entity_2.default)
            .createQueryBuilder("event")
            .leftJoinAndSelect("event.tickets", "ticket")
            .where("event.id = :id", { id: id })
            .getMany();
        return events;
    }
    async updateTicket(id, update) {
        const ticket = await entity_1.default.findOne(id);
        if (!ticket) {
            throw new routing_controllers_1.NotFoundError('Can not find ticket');
        }
        else {
            return entity_1.default.merge(ticket, update).save();
        }
    }
    async deleteTicket(id) {
        const deleteTicket = await entity_1.default.findOne(id);
        if (!deleteTicket) {
            throw new routing_controllers_1.NotFoundError('Can not find ticket');
        }
        else {
            return entity_1.default.delete(deleteTicket);
        }
    }
};
__decorate([
    routing_controllers_1.Post('/events/:id/tickets'),
    __param(0, routing_controllers_1.Body()), __param(1, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default, Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createEventsTicket", null);
__decorate([
    routing_controllers_1.Get('/events/:id/tickets'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getEventsTickets", null);
__decorate([
    routing_controllers_1.Put('/events/:eventId/tickets/:id'),
    __param(0, routing_controllers_1.Param('id')), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateTicket", null);
__decorate([
    routing_controllers_1.Delete('/events/:eventId/tickets/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "deleteTicket", null);
TicketController = __decorate([
    routing_controllers_1.JsonController()
], TicketController);
exports.default = TicketController;
//# sourceMappingURL=controller.js.map