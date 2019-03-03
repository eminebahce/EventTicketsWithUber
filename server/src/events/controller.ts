import Event from './entity';
import User from '../users/entity';
import {Get, Post, JsonController, Body, Put, Param, NotFoundError, Delete, Authorized, Req} from "routing-controllers";
import {getConnection} from "typeorm";

@JsonController()
export default class EventController {

    @Get('/events')
    async getEvents() {
        const currentDate = new Date();
        const events = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .where("event.endDate >= :currentDate", {currentDate: currentDate})
            .getMany();
        return {events}
    }

    @Authorized()
    @Post('/events')
    async createEvents(@Body() event: Event, @Req() request: any) {
        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .where("user.id = :id", {id: request.user.id})
            .getOne();

        if (user) {
            event.createDate = new Date();
            event.user = user;
            const eventEntity = Event.create(event)
            return await eventEntity.save()
        }
        return "";
    }

    @Authorized()
    @Put('/events/:eventId')
    async updateEvent(@Param('eventId') eventId: number, @Body() update: Partial<Event>, @Req() request: any) {
        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .where("user.id = :id", {id: request.user.id})
            .andWhere("event.id = :eventId", {eventId: eventId})
            .getOne();

        if (user) {
            const event = user.events[0];
            if (!event) {
                throw new NotFoundError('Can not find event');
            } else {
                return Event.merge(event, update).save();
            }
        }
        return "";
    }

    @Authorized()
    @Delete('/events/:eventId')
    async deleteEvent(@Param('eventId') eventId: number, @Req() request: any) {
        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.events", "event")
            .where("user.id = :id", {id: request.user.id})
            .andWhere("event.id = :eventId", {eventId: eventId})
            .getOne();

        if (!user || user.events.length === 0) {
            throw new NotFoundError('Can not find event');
        } else {
            return Event.delete(user.events[0]);
        }
    }


}