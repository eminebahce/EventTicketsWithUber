import React from 'react';

export default function CreateTicketForm(props) {

    return(
        <div>
            <form onSubmit={props.onSubmit}>
                <div className="form-group">
                    <h2>Create Comment</h2>
                </div>
                <div className="form-group">
                    <label>
                        Comment:
                        <input type="text"
                               name="text"
                               className="form-control"
                               onChange={props.onChange}
                               value={props.values.text}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Author:
                        <input type="text"
                               name="author"
                               className="form-control"
                               onChange={props.onChange}
                               value={props.values.author}
                        />
                    </label>
                </div>
                <button className="btn btn-success" type="submit">Create Comment</button>
            </form>
        </div>
    )
}