import React from 'react';
import FormControl from '../FormControl.css';

export default function EventEditForm(props) {
    //console.log(props.values)

    return(
        <div className="FormControl">
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <h2>Edit Event</h2>
                </div>
                <div className="form-group">
                    <label>
                        Event Name:
                        <input type="text"
                               name="name"
                               className="form2-control"
                               onChange={props.onChange}
                               value={props.values.name}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Event Description:
                        <input type="text"
                               name="description"
                               className="form3-control"
                               onChange={props.onChange}
                               value={props.values.description}
                        />
                    </label>
                </div>
               <div className="form-group">
                   <label>
                       Picture:
                       <input type="text"
                              name="picture"
                              className="form1-control"
                              onChange={props.onChange}
                              value={props.values.picture}
                       />
                   </label>
               </div>
               <div className="form-group">
                   <label>
                       Start Date:
                       <input type="datetime-local"
                              name="startDate"
                              className="form-control"
                              onChange={props.onChange}
                              value={props.values.startDate}
                       />
                   </label>
               </div>
                <div className="form-group">
                    <label>
                        End Date:
                        <input type="datetime-local"
                               name="endDate"
                               className="form-control"
                               onChange={props.onChange}
                               value={props.values.endDate}
                        />
                    </label>
                </div>
                <button type="submit">Edit Event</button>
            </form>
        </div>
    )
}