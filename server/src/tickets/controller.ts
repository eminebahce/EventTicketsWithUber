import Ticket from './entity';
import {Get, Post, JsonController, Body} from "routing-controllers";

@JsonController()
export default class TicketController {

    @Get('/tickets')
     async getTickets(){
        const tickets = await Ticket.find()
        return {tickets}
    }

    @Post('/tickets')
        async createTicket(@Body() ticket:Ticket){
        const ticketEntity = Ticket.create(ticket)
        await ticketEntity.save()
    }



}