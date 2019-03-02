import React from 'react';

export default function CreateEventForm(props) {

    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <h2>Create Event</h2>
                <label>
                    Event Name:
                    <input type="text"
                           name="name"
                           value={props.values.name}
                           onChange={props.onChange}
                    />
                </label>
                <label>
                    Event Description:
                    <input type="text"
                           name="description"
                           value={props.values.description}
                           onChange={props.onChange}
                    />
                </label>
                <label>
                    Picture:
                    <input type="text"
                           name="picture"
                           value={props.values.picture}
                           onChange={props.onChange}
                    />
                </label>
                <label>
                    Start Date:
                    <input type="datetime-local"
                           name="startDate"
                           value={props.values.startDate}
                           onChange={props.onChange}
                    />
                </label>
                <label>
                    End Date:
                    <input type="datetime-local"
                           name="endDate"
                           value={props.values.endDate}
                           onChange={props.onChange}
                    />
                </label>
                <button type="submit">Create Event</button>
            </form>
        </div>
    )
}