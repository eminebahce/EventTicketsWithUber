import React from 'react';
import FormControl from '../FormControl.css'

export default function TicketEditForm(props) {

    return(
        <div className="FormControl">
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <h2>Edit Ticket</h2>
                </div>
                <div className="form-group">
                    <label>
                        Ticket Description:
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
                        Ticket Picture:
                        <input type="text"
                               name="picture"
                               className="form4-control"
                               onChange={props.onChange}
                               value={props.values.picture}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Price:
                        <input type="number"
                               name="price"
                               className="form1-control"
                               onChange={props.onChange}
                               value={props.values.price}
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
                <button type="submit">Edit Ticket</button>
            </form>
        </div>
    )
}