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
                           onChange={props.onChange}
                           value={props.values.name}
                    />
                </label>
                <label>
                    Event Description:
                    <input type="text"
                           name="description"
                           onChange={props.onChange}
                           value={props.values.description}
                    />
                </label>
                <label>
                    Picture:
                    <input type="text"
                           name="picture"
                           onChange={props.onChange}
                           value={props.values.picture}
                    />
                </label>
                <label>
                    Start Date:
                    <input type="date"
                           name="startDate"
                           onChange={props.onChange}
                           value={props.values.startDate}
                    />
                </label>
                <label>
                    End Date:
                    <input type="date"
                           name="endDate"
                           onChange={props.onChange}
                           value={props.values.endDate}
                    />
                </label>
                <button type="submit">Create Event</button>
            </form>
        </div>
    )
}