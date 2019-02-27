import React from 'react';

export default function TicketCommentsList(props) {
    console.log(props);

    return (
        <div>
            {(props.comments) &&
            <div>
                <div>
                    <p>{props.comments[0].description}</p>
                    <p>{props.comments[0].endDate}</p>
                    <p>{props.comments[0].price}</p>
                    <p>{props.comments[0].picture}</p>
                </div>
                <div>
                    {(props.comments[0].comments) && props.comments[0].comments.map(comment =>
                        <li key={comment.id}>
                        <p>{comment.text}</p>
                        <p>{comment.createDate}</p>
                        </li>
                    )}
                </div>
                {!props.comments && <div><p>Loading...</p></div>}
            </div>}
        </div>
    );
}
