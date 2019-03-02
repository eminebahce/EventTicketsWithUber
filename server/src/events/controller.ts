import Event from './entity';
import {Get, Post, JsonController, Body, Put, Param, NotFoundError, Delete} from "routing-controllers";
import {getConnection} from "typeorm";

@JsonController()
export default class EventController {

    @Get('/events')
    async getEvents(){
        const currentDate = new Date();
        const events = await getConnection()
            .getRepository(Event)
            .createQueryBuilder("event")
            .where("event.endDate >= :currentDate", {currentDate: currentDate})
            .getMany();
        return {events}
    }

    @Post('/events')
    async createEvents(@Body() event: Event){
        event.createDate = new Date();
        const eventEntity = Event.create(event)
        const savedEvent = await eventEntity.save()
        return savedEvent
    }

    @Put('/events/:id')
    async updateEvent(@Param('id') id:number, @Body() update:Partial<Event>){
        const event = await Event.findOne(id);
        if(!event){
            throw new NotFoundError('Can not find event');
        } else {
            return Event.merge(event, update).save();
        }
    }

    @Delete('/events/:id')
    async deleteEvent(@Param('id') id:number){
        const deleteEvent = await Event.findOne(id)
        if(!deleteEvent){
            throw new NotFoundError('Can not find event');
        } else {
            return Event.delete(deleteEvent);
        }
        return id;
    }


}