import Ticket from './tickets/entity';
import Comment from './comments/entity';
import {getConnection} from "typeorm";

async function FraudCalculation(ticketId:number, eventId:number) {

    let risk:number = 0;

    //number of tickets of the user (not authenticated!)
    const tickets = await getConnection()
        .getRepository("tickets")
        .createQueryBuilder("ticket")
        .where(qb => {
            const subquery = qb.subQuery()
                .select("ticket.user_id")
                .from(Ticket, "ticket")
                .where("ticket.id = :id", {id:ticketId})
                .getQuery();

            return `ticket.user_Id = ${subquery}`;
        })
        .getMany();

    if(tickets.length > 1){
        risk += 10;
    }

    //average price of tickets of the event (only ticket repo!)
    const eventTickets = await getConnection()
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .select("AVG(ticket.price)", "avgPrice")
        .where("ticket.event_id = :id", {id:eventId})
        .getRawOne();

    const ticket = await getConnection()
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", {id:ticketId})
        .getOne();

    if(ticket!.price < eventTickets.avgPrice){
        const cheapRatio = ((eventTickets.avgPrice - ticket!.price) / eventTickets.avgPrice) * 100;
        risk += cheapRatio;
    } else if (ticket!.price > eventTickets.avgPrice){
        const expensiveRatio = ((ticket!.price - eventTickets.avgPrice) / ticket!.price) * 100;
        if (expensiveRatio < 10) {
            risk -= expensiveRatio;
        } else {
            risk -= 10;
        }
    }

    //business hour addition of the ticket
    const ticketBHour = await getConnection()
        .getRepository(Ticket)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", {id:ticketId})
        .getOne();

    const hour = new Date();
    hour.setUTCHours(ticketBHour!.createDate.getHours(), ticketBHour!.createDate.getMinutes(), ticketBHour!.createDate.getSeconds());
    const start = new Date();
    start.setUTCHours(9,0,0);
    const end = new Date();
    end.setUTCHours(17,0,0);

    if(hour >= start && hour <= end){
        risk -=10;
    } else {
      risk +=10;
    }

    //number of comments of the tickets
    const comments = await getConnection()
        .getRepository(Comment)
        .createQueryBuilder("comment")
        .andWhere("comment.ticket_id = :id", {id:ticketId})
        .getMany();

    if (comments.length > 3) {
        risk += 10;
    }

    //last check for risk limit
    if (risk < 5) {
        risk = 5;
    } else if (risk > 95) {
        risk = 95;
    }

    return risk;
}

export default FraudCalculation;