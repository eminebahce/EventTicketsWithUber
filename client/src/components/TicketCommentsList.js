import React from 'react';
import {Link} from "react-router-dom";
import CreateCommentFormContainer from './CreateCommentFormContainer'

export default function TicketCommentsList(props) {

    const formatDate = (date) => {
        const dateObject = new Date(date);
        return dateObject.getFullYear() + "/" +
            ("0" + (dateObject.getMonth() + 1)).slice(-2) + "/" +
            ("0" + dateObject.getDate()).slice(-2) + " " +
            ("0" + dateObject.getHours()).slice(-2) + ":" +
            ("0" + dateObject.getMinutes()).slice(-2) + ":" +
            ("0" + dateObject.getSeconds()).slice(-2);
    }

    return (
        <div className="container">
            {(props.comments) && (props.comments.ticket) &&
            <div>
                <div className="row">
                    <div className='img-thumbnail mr-1 mb-4'>
                        <div className="col-sm-5">
                            <img className='img-responsive tile-img'
                                 src={props.comments.ticket[0].picture}/>
                        </div>
                        <div className="col-sm-7 tile">
                            <div className='tile-info'>
                                <div className="row">
                                    <h1>{props.comments.ticket[0].description}</h1>
                                </div>
                                <div className="row">
                                    <h5>{props.comments.ticket[0].price}</h5>
                                </div>
                                <div className="row">
                                    <h6>{formatDate(props.comments.ticket[0].endDate)}</h6>
                                </div>
                                {props.comments.risk >= 50 && <div className="row">
                                    <button className="btn btn-danger">Risk: {props.comments.risk} %</button>
                                </div>}
                                {props.comments.risk <= 15 && <div className="row">
                                    <button className="btn btn-success">Risk: {props.comments.risk} %</button>
                                </div>}
                                {props.comments.risk > 15 && props.comments.risk < 50 && <div className="row">
                                    <button className="btn btn-warning">Risk: {props.comments.risk} %</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {(props.comments.ticket[0].comments) && props.comments.ticket[0].comments.map(comment =>
                            <div key={comment.id}>
                                <div className="row">
                                    <h6>{comment.text}</h6>
                                </div>
                                <div className="row">
                                    <h6>{formatDate(comment.createDate)}</h6>
                                </div>
                                <div className="row">
                                    <button className="btn btn-danger btn-sm mt-1 mr-1"
                                            onClick={() => props.onDelete(comment.id)}>X
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <CreateCommentFormContainer
                        eventId={props.eventId}
                        ticketId={props.ticketId}
                    />
                </div>
                <div className="row">
                    {!props.comments && <div><p>Loading...</p></div>}
                </div>
            </div>
            }
        </div>
    );
}

