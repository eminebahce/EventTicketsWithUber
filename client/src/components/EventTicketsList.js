import React from 'react';
import {Link} from "react-router-dom";
import TicketEditForm from './TicketEditForm';
import EventEditForm from "./EventsList";

export default function EventTicketsList(props) {
    return(
        <div>
            {props.editMode && <TicketEditForm  onSubmit={props.onSubmit}
                                                onChange={props.onChange}
                                                value={props.values.name}
            />}
            {!props.editMode && <div>
                <ul>
                    {props.tickets && props.tickets.map((ticket)=>
                        (<li key={ticket.id}><Link to={`/events/${props.eventId}/tickets/${ticket.id}`}><p>{ticket.description}</p></Link>
                            <div>
                                <p>{ticket.picture}</p>
                                <p>{ticket.startDate}</p>
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