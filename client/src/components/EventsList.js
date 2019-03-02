import React from 'react';
import {Link} from "react-router-dom";
import EventEditForm from './EventEditForm'

export default function EventsList(props) {

    const formatDate = (date) => {
        return new Date(date).toString();
    }

    return(
        <div>
            <Link to="/createEvent"><button className="btn btn-info mt-1 mb-4">Create Event</button></Link>

            {props.editMode && <EventEditForm onSubmit={props.onSubmit}
                                              onChange={props.onChange}
                                              values={props.values}
            />}

            {!props.editMode && <div>
                <ul>
                    {props.events && props.events.map((event) =>
                        (<li key={event.id}><Link to={`/events/${event.id}/tickets`}><p>{event.name}</p></Link>
                            <div>
                                <p>{event.description}</p>
                                <p>{event.picture}</p>
                                <p>{formatDate(event.startDate)}</p>
                                <p>{formatDate(event.endDate)}</p>
                                <button onClick={() => props.onDelete(event.id)}>X</button>
                                <button onClick={() => props.onEdit(event)}>Edit</button>
                            </div>
                        </li>)
                    )}
                    {!props.events && <li>Loading events...</li>}
                </ul>
            </div>}

        </div>
    )
}

