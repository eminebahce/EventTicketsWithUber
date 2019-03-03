import React from 'react';
import {Link} from "react-router-dom";
import TicketEditForm from './TicketEditForm';

export default function EventTicketsList(props) {

    const formatDate = (date) => {
        const dateObject = new Date(date);
        return dateObject.getFullYear() + "/" +
            ("0" + (dateObject.getMonth()+1)).slice(-2) + "/" +
            ("0" + dateObject.getDate()).slice(-2) + " " +
            ("0" + dateObject.getHours()).slice(-2) + ":" +
            ("0" + dateObject.getMinutes()).slice(-2) + ":" +
            ("0" + dateObject.getSeconds()).slice(-2);
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