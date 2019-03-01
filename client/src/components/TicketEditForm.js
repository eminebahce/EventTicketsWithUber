import React from 'react';

export default function TicketEditForm(props) {

    return(
        <div>
            <form>
                <h2>Edit Ticket</h2>
                <label>
                    Ticket Description:
                    <input type="text"
                           name="description"
                    />
                </label>
                <label>
                    Ticket Picture:
                    <input type="text"
                           name="picture"
                    />
                </label>
                <label>
                    Price:
                    <input type="number"
                           name="price"
                    />
                </label>
                <label>
                    End Date:
                    <input type="date"
                           name="endDate"
                    />
                </label>
                <button type="submit">Edit Ticket</button>
            </form>
        </div>
    )
}