import React from 'react';

export default function CreateTicketForm(props) {

    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <h2>Create Comment</h2>
                <label>
                    Comment:
                    <input type="text"
                           name="text"
                           onChange={props.onChange}
                           value={props.values.text}
                    />
                </label>
                <label>
                    Author:
                    <input type="text"
                           name="author"
                           onChange={props.onChange}
                           value={props.values.author}
                    />
                </label>
                <button type="submit">Create Comment</button>
            </form>
        </div>
    )
}