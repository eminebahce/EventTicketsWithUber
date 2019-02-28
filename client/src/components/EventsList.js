import React from 'react';
import {Link} from "react-router-dom";

export default function EventsList(props) {

    return(
        <div>
            <ul>
                {props.events && props.events.map((event)=>
                    (<li key={event.id}><Link to={`/events/${event.id}/tickets`}><p>{event.name}</p></Link>
                        <div>
                            <p>{event.description}</p>
                            <p>{event.image}</p>
                            <p>{event.startDate}</p>
                            <p>{event.endDate}</p>
                            <button onClick={() => props.onDelete(event.id)}>X</button>
                            <button onClick={() => props.onEdit(event)}>Edit</button>
                        </div>
                    </li>)
                )}
                {!props.events && <li>Loading events...</li>}
            </ul>
        </div>
    )
}

