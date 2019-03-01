import React from 'react';
import {Link} from "react-router-dom";
import CreateCommentFormContainer from './CreateCommentFormContainer'

export default function TicketCommentsList(props) {
    //console.log(props);

    return (
        <div>
            {(props.comments) &&
            <div>
                <div>
                    <p>{props.comments.ticket[0].description}</p>
                    <p>{props.comments.ticket[0].endDate}</p>
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
                        <p>{comment.createDate}</p>
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
