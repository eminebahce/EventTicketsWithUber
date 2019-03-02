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
let EventController = class EventController {
    async getEvents() {
        const currentDate = new Date();
        const events = await typeorm_1.getConnection()
            .getRepository(entity_1.default)
            .createQueryBuilder("event")
            .where("event.endDate >= :currentDate", { currentDate: currentDate })
            .getMany();
        return { events };
    }
    async createEvents(event) {
        event.createDate = new Date();
        const eventEntity = entity_1.default.create(event);
        const savedEvent = await eventEntity.save();
        return savedEvent;
    }
    async updateEvent(id, update) {
        const event = await entity_1.default.findOne(id);
        if (!event) {
            throw new routing_controllers_1.NotFoundError('Can not find event');
        }
        else {
            return entity_1.default.merge(event, update).save();
        }
    }
    async deleteEvent(id) {
        const deleteEvent = await entity_1.default.findOne(id);
        if (!deleteEvent) {
            throw new routing_controllers_1.NotFoundError('Can not find event');
        }
        else {
            return entity_1.default.delete(deleteEvent);
        }
        return id;
    }
};
__decorate([
    routing_controllers_1.Get('/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEvents", null);
__decorate([
    routing_controllers_1.Post('/events'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvents", null);
__decorate([
    routing_controllers_1.Put('/events/:id'),
    __param(0, routing_controllers_1.Param('id')), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
__decorate([
    routing_controllers_1.Delete('/events/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
EventController = __decorate([
    routing_controllers_1.JsonController()
], EventController);
exports.default = EventController;
//# sourceMappingURL=controller.js.map