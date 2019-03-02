import React from 'react';
import {Link} from "react-router-dom";
import TicketEditForm from './TicketEditForm';

export default function EventTicketsList(props) {

    const formatDate = (date) => {
        return new Date(date).toString();
    }

    return(
        <div>

            <Link to={`/createTicket/${props.eventId}`}><button className="btn btn-info mt-1 mb-4">Create Ticket</button></Link>

            {props.ticketeditMode && <TicketEditForm onSubmit={props.onSubmit}
                                                     onChange={props.onChange}
                                                     values={props.values}
            />}
            {!props.ticketeditMode && <div>
                <ul>
                    {props.tickets && props.tickets.map((ticket)=>
                        (<li key={ticket.id}><Link to={`/events/${props.eventId}/tickets/${ticket.id}`}><p>{ticket.description}</p></Link>
                            <div>
                                <p>{ticket.picture}</p>
                                <p>{formatDate(ticket.endDate)}</p>
                                <p>{ticket.price}</p>
                                <button onClick={() => props.onDelete(ticket.id)}>X</button>
                                <button onClick={() => props.onEdit(ticket)}>Edit</button>
                            </div>
                        </li>)
                    )}
                    {!props.tickets && <li>Loading tickets...</li>}
                </ul>
            </div>}
        </div>
    );
}