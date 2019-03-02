import React from 'react';
import {Link} from "react-router-dom";
import CreateCommentFormContainer from './CreateCommentFormContainer'

export default function TicketCommentsList(props) {

    const formatDate = (date) => {
        return new Date(date).toString();
    }

    return (
        <div>
            {(props.comments) && (props.comments.ticket) &&
            <div>
                <div>
                    <p>{props.comments.ticket[0].description}</p>
                    <p>{formatDate(props.comments.ticket[0].endDate)}</p>
                    <p>{props.comments.ticket[0].price}</p>
                    <p>{props.comments.ticket[0].picture}</p>
                </div>
                <div>
                    <p>
                        Risk: {props.comments.risk} %
                    </p>
                </div>
                <div>
                    {(props.comments.ticket[0].comments) && props.comments.ticket[0].comments.map(comment =>
                        <li key={comment.id}>
                            <p>{comment.text}</p>
                            <p>{formatDate(comment.createDate)}</p>
                            <p>
                                <button onClick={() => props.onDelete(comment.id)}>X</button>
                            </p>
                        </li>
                    )}
                </div>
                {!props.comments && <div><p>Loading...</p></div>}
            </div>}
            <div>
                <CreateCommentFormContainer
                    eventId={props.eventId}
                    ticketId={props.ticketId}
                />
            </div>
        </div>
    );
}
