import React from 'react';
import {Link} from "react-router-dom";
import EventEditForm from './EventEditForm'
import eventList from '../eventList.css';

export default function EventsList(props) {
    //{event.picture}

    const formatDate = (date) => {
        const dateObject = new Date(date);
        return dateObject.getFullYear() + "/" +
        ("0" + (dateObject.getMonth()+1)).slice(-2) + "/" +
        ("0" + dateObject.getDate()).slice(-2) + " " +
        ("0" + dateObject.getHours()).slice(-2) + ":" +
        ("0" + dateObject.getMinutes()).slice(-2) + ":" +
        ("0" + dateObject.getSeconds()).slice(-2);
    }

    return (
        <div className="container">
            <div className="row">
                <Link to="/createEvent">
                    <button className="btn btn-info mt-1 mb-4">Create Event</button>
                </Link>
            </div>
            <div className="row">
                {props.editMode && <EventEditForm onSubmit={props.onSubmit}
                                                  onChange={props.onChange}
                                                  values={props.values}
                />}
            </div>
            {!props.editMode &&
            <div className="row">
                {props.events && props.events.map((event) =>
                    <div key={event.id} className='img-thumbnail mr-1 mb-4'>
                        <div className="col-sm-5">
                            <img className='img-responsive tile-img'
                                 src={event.picture}/>
                        </div>
                        <div className="col-sm-7 tile">
                            <div className='tile-info'>
                                <div className="row">
                                    <Link to={`/events/${event.id}/tickets`}><h1>{event.name}</h1></Link>
                                </div>
                                <div className="row">
                                    <h5>{event.description}</h5>
                                </div>
                                <div className="row">
                                    <h6>{formatDate(event.startDate)}</h6>
                                </div>
                                <div className="row">
                                    <h6>{formatDate(event.endDate)}</h6>
                                </div>
                                <div className="row">
                                    <button className="btn btn-danger btn-sm mt-1 mr-1" onClick={() => props.onDelete(event.id)}>X</button>
                                    <button className="btn btn-info btn-sm mt-1 mr-1" onClick={() => props.onEdit(event)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            }
            <div className="row"> {props.total !== 0 &&
            <div>
                <p>
                    <button className="btn btn-success mt-1 mb-4" onClick={() => props.onSkipPage(Math.ceil(props.total / 9))}>Next Page</button>
                </p>
            </div>}
            </div>
            <div className="row">
                {!props.events && <li>Loading events...</li>}
            </div>
        </div>
    )
}

