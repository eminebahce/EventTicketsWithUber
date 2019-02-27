import React from 'react';
import {Link} from "react-router-dom";

export default function EventTicketsList(props) {
    //console.log(props.tickets);
    return(
        <div>
            <ul>
                {props.tickets && props.tickets.map((ticket)=>
                    (<li key={ticket.id}><Link to={`/events/${ticket.id}/tickets`}>
                        <div>
                            <p>{ticket.description}</p>
                            <p>{ticket.picture}</p>
                            <p>{ticket.startDate}</p>
                            <p>{ticket.price}</p>
                        </div>
                    </Link>
                    </li>)
                )}
                {!props.ticket && <li>Loading events...</li>}
            </ul>
        </div>
    );
}