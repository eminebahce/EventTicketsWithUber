import React from 'react';
import FormControl from '../FormControl.css';

export default function CreateEventForm(props) {

    return(
        <div className="FormControl">
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <h2>Create Event</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="eventName" className="control-label">
                        Event Name:
                        <input type="text"
                               name="name"
                               className="form2-control"
                               id="eventName"
                               value={props.values.name}
                               onChange={props.onChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="eventDesc">
                        Event Description:
                        <input type="text"
                               name="description"
                               className="form3-control"
                               id="eventDesc"
                               value={props.values.description}
                               onChange={props.onChange}
                        />
                    </label>
                </div>
                    <div className="form-group">
                        <label htmlFor="picture">
                            Picture:
                            <input type="text"
                                   name="picture"
                                   className="form1-control"
                                   id="picture"
                                   value={props.values.picture}
                                   onChange={props.onChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">
                            Start Date:
                            <input type="datetime-local"
                                   name="startDate"
                                   id="start"
                                   className="form-control"
                                   value={props.values.startDate}
                                   onChange={props.onChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="end">
                            End Date:
                            <input type="datetime-local"
                                   name="endDate"
                                   id="end"
                                   className="form-control"
                                   value={props.values.endDate}
                                   onChange={props.onChange}
                            />
                        </label>
                    </div>
                    <button className="btn btn-success" type="submit">Create Event</button>
            </form>
        </div>
    )
}