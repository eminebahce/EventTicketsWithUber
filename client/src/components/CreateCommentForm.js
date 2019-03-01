import React from 'react';

export default function CreateTicketForm(props) {

    return(
        <div>
            <form onSubmit={props.onSubmit} onChange={props.onChange} value={props.values.text}>
                <h2>Create Comment</h2>
                <label>
                    Comment:
                    <input type="text"
                           name="text"
                    />
                </label>
                <label>
                    Author:
                    <input type="text"
                           name="author"
                    />
                </label>
                <button type="submit">Create Comment</button>
            </form>
        </div>
    )
}