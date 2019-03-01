import React from 'react';

export default function CreateEventForm(props) {

    return(
        <div>
            <form onSubmit={props.onSubmit} onChange={props.onChange} value={props.values.name}>
                <h2>Create Event</h2>
                <label>
                    Event Name:
                    <input type="text"
                           name="name"

                    />
                </label>
                <label>
                    Event Description:
                    <input type="text"
                           name="description"
                    />
                </label>
                <label>
                    Picture:
                    <input type="text"
                           name="picture"
                    />
                </label>
                <label>
                    Start Date:
                    <input type="date"
                           name="startDate"
                    />
                </label>
                <label>
                    End Date:
                    <input type="date"
                           name="endDate"
                    />
                </label>
                <button type="submit">Create Event</button>
            </form>
        </div>
    )
}