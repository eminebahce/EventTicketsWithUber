import Event from './entity';
import {Get, Post, JsonController, Body} from "routing-controllers";

@JsonController()
export default class EventController {

    @Get('/events')
    async getEvents(){
        const events = await Event.find()
        return {events}
    }

    @Post('/events')
    async createEvents(@Body() event: Event){
        const eventEntity = Event.create(event)
        await eventEntity.save()
    }
}