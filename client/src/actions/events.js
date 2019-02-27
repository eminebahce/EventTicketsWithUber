import request from 'superagent';

const baseUrl = 'http://localhost:4000';

export const loadEvents = () => {
    return(dispatch, getState) => {

        request(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(eventsFetched(response.body.events))
            })
            .catch(error => console.error)
    }
}

const eventsFetched = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});

export const loadTickets = (id) => {
    return(dispatch) => {
        request(`${baseUrl}/events/${id}/tickets`)
            .then(response => {
                //console.log(response.body[0].tickets)
                dispatch(loadTicketsByEventId(response.body[0].tickets))
            })
            .catch(error => console.error)
    }
}

const loadTicketsByEventId = (tickets) => ({
   type: 'TICKETS_FETCHED',
   payload: {
       tickets:tickets
   }
});