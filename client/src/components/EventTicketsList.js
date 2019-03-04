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
        <div className="container">
            {!!props.auth !== "" &&
            <div className="row">
                <Link to={`/createTicket/${props.eventId}`}>
                    <button className="btn btn-info mt-1 mb-4">Create Ticket</button>
                </Link>
            </div>
            }

            <div className="row">
                {props.auth && props.ticketeditMode && <TicketEditForm onSubmit={props.onSubmit}
                                                         onChange={props.onChange}
                                                         values={props.values}
                />}
            </div>
            {!props.ticketeditMode &&
            <div className="row">
                {props.tickets && props.tickets.map((ticket)=>
                    <div key={ticket.id} className='img-thumbnail mr-1 mb-4'>
                        <div className="col-sm-5">
                            <img className='img-responsive tile-img'
                                 src={ticket.picture}/>
                        </div>
                        <div className="col-sm-7 tile">
                            <div className='tile-info'>
                                <div className="row">
                                    <Link to={`/events/${props.eventId}/tickets/${ticket.id}`}><h1>{ticket.description}</h1></Link>
                                </div>
                                <div className="row">
                                    <h5>{ticket.price}</h5>
                                </div>
                                <div className="row">
                                    <h6>{formatDate(ticket.endDate)}</h6>
                                </div>
                                <div className="row">
                                    <button className="btn btn-danger btn-sm mt-1 mr-1"  onClick={() => props.onDelete(ticket.id)}>X</button>
                                    <button className="btn btn-info btn-sm mt-1 mr-1" onClick={() => props.onEdit(ticket)}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            }
            <div className="row">
                {!props.tickets && <li>Loading tickets...</li>}
            </div>
        </div>
    );
}