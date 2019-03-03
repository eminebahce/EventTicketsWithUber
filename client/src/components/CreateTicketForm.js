import React from 'react';
import FormControl from '../FormControl.css'


export default function CreateTicketForm(props) {

    return(
        <div className="FormControl">
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <h2>Create Ticket</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="desc">
                        Ticket Description:
                        <input type="text"
                               name="description"
                               id="desc"
                               className="form3-control"
                               onChange={props.onChange}
                               value={props.values.description}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="pic">
                        Ticket Picture:
                        <input type="text"
                               name="picture"
                               id="pic"
                               className="form4-control"
                               onChange={props.onChange}
                               value={props.values.picture}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="price">
                        Price:
                        <input type="number"
                               name="price"
                               id="price"
                               className="form1-control"
                               onChange={props.onChange}
                               value={props.values.price}
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
                               onChange={props.onChange}
                               value={props.values.endDate}
                        />
                    </label>
                </div>
                <button className="btn btn-success" type="submit">Create Ticket</button>
            </form>
        </div>
    )
}