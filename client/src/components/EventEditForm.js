import React from 'react';

export default function EventEditForm(props) {
    //console.log(props.values)

    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <h2>Edit Event</h2>
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
                    <input type="datetime-local"
                           name="startDate"
                           onChange={props.onChange}
                           value={props.values.startDate}
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
                <button type="submit">Edit Event</button>
            </form>
        </div>
    )
}