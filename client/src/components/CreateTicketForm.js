import React from 'react';

export default function CreateTicketForm(props) {

    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <h2>Create Ticket</h2>
                <label>
                    Ticket Description:
                    <input type="text"
                           name="description"
                           onChange={props.onChange}
                           value={props.values.description}
                    />
                </label>
                <label>
                    Ticket Picture:
                    <input type="text"
                           name="picture"
                           onChange={props.onChange}
                           value={props.values.picture}
                    />
                </label>
                <label>
                    Price:
                    <input type="number"
                           name="price"
                           onChange={props.onChange}
                           value={props.values.price}
                    />
                </label>
                <label>
                    End Date:
                    <input type="datetime-local"
                           name="endDate"
                           onChange={props.onChange}
                           value={props.values.endDate}
                    />
                </label>
                <button type="submit">Create Ticket</button>
            </form>
        </div>
    )
}