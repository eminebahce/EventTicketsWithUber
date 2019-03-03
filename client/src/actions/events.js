import request from 'superagent';

const baseUrl = 'http://localhost:4000';

export const loadEvents = (skip = 0, take = 9) => {
    return(dispatch, getState) => {
        request(`${baseUrl}/events/?skip=${skip}&take=${take}`)
            .then(response => {
                dispatch(eventsFetched(response.body))
            })
            .catch(error => console.error)
    }
}

const eventsFetched = (response) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:response.events,
        total:response.total
    }
});

export const loadTickets = (id) => {
    return(dispatch, getState) => {
        //console.log(getState().auth);
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

export const loadComments = (id, ticketId) => {
    return(dispatch) => {
        request(`${baseUrl}/events/${id}/tickets/${ticketId}/comments`)
            .then(response => {
                dispatch(loadCommentsByTicketId(response.body[0]))
            })
            .catch(error => console.error)
    }
}

const loadCommentsByTicketId = (comments) => ({
    type:'COMMENTS_FETCHED',
    payload: {
        comments:comments
    }
})