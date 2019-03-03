"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./tickets/entity");
const entity_2 = require("./comments/entity");
const typeorm_1 = require("typeorm");
async function FraudCalculation(ticketId, eventId) {
    let risk = 0;
    const tickets = await typeorm_1.getConnection()
        .getRepository("tickets")
        .createQueryBuilder("ticket")
        .where(qb => {
        const subquery = qb.subQuery()
            .select("ticket.user_id")
            .from(entity_1.default, "ticket")
            .where("ticket.id = :id", { id: ticketId })
            .getQuery();
        return `ticket.user_Id = ${subquery}`;
    })
        .getMany();
    if (tickets.length > 1) {
        risk += 10;
    }
    const eventTickets = await typeorm_1.getConnection()
        .getRepository(entity_1.default)
        .createQueryBuilder("ticket")
        .select("AVG(ticket.price)", "avgPrice")
        .where("ticket.event_id = :id", { id: eventId })
        .getRawOne();
    const ticket = await typeorm_1.getConnection()
        .getRepository(entity_1.default)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", { id: ticketId })
        .getOne();
    if (ticket.price < eventTickets.avgPrice) {
        const cheapRatio = ((eventTickets.avgPrice - ticket.price) / eventTickets.avgPrice) * 100;
        risk += cheapRatio;
    }
    else if (ticket.price > eventTickets.avgPrice) {
        const expensiveRatio = ((ticket.price - eventTickets.avgPrice) / ticket.price) * 100;
        if (expensiveRatio < 10) {
            risk -= expensiveRatio;
        }
        else {
            risk -= 10;
        }
    }
    const ticketBHour = await typeorm_1.getConnection()
        .getRepository(entity_1.default)
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", { id: ticketId })
        .getOne();
    const hour = new Date();
    hour.setUTCHours(ticketBHour.createDate.getHours(), ticketBHour.createDate.getMinutes(), ticketBHour.createDate.getSeconds());
    const start = new Date();
    start.setUTCHours(9, 0, 0);
    const end = new Date();
    end.setUTCHours(17, 0, 0);
    if (hour >= start && hour <= end) {
        risk -= 10;
    }
    else {
        risk += 10;
    }
    const comments = await typeorm_1.getConnection()
        .getRepository(entity_2.default)
        .createQueryBuilder("comment")
        .andWhere("comment.ticket_id = :id", { id: ticketId })
        .getMany();
    if (comments.length > 3) {
        risk += 10;
    }
    if (risk < 5) {
        risk = 5;
    }
    else if (risk > 95) {
        risk = 95;
    }
    return Math.floor(risk);
}
exports.default = FraudCalculation;
//# sourceMappingURL=fraudCalculation.js.map