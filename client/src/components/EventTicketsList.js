import React from 'react';
import {Link} from "react-router-dom";

export default function EventTicketsList(props) {
    return(
        <div>
            <ul>
                {props.tickets && props.tickets.map((ticket)=>
                    (<li key={ticket.id}><Link to={`/events/${props.eventId}/tickets/${ticket.id}`}><p>{ticket.description}</p></Link>
                        <div>
                            <p>{ticket.picture}</p>
                            <p>{ticket.startDate}</p>
                            <p>{ticket.price}</p>
                        </div>
                    </li>)
                )}
            </ul>
        </div>
    );
}