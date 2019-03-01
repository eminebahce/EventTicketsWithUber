import request from 'superagent';

const baseUrl = 'http://localhost:4000';

export const createEvent = (event) => {
    return(dispatch, getState) => {

        request(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(eventCreated(response.body.events))
            })
            .catch(error => console.error)
    }
}

const eventCreated = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});

export const createTicket = (event) => {
    return(dispatch, getState) => {

        request(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(ticketCreated(response.body.events))
            })
            .catch(error => console.error)
    }
}

const ticketCreated = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});

export const createComment = (event) => {
    return(dispatch, getState) => {

        request(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(commentCreated(response.body.events))
            })
            .catch(error => console.error)
    }
}

const commentCreated = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});

export const updateEvent = (event) => {
    return(dispatch, getState) => {

        request(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(eventUpdated(response.body.events))
            })
            .catch(error => console.error)
    }
}

const eventUpdated = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});

export const deleteEvent = (id) => {
    return(dispatch, getState) => {

        request
            .delete(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(eventDeleted(response.body.events))
            })
            .catch(error => console.error)
    }
}

const eventDeleted = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});

export const deleteTicket = (id) => {
    return(dispatch, getState) => {

        request
            .delete(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(ticketDeleted(response.body.events))
            })
            .catch(error => console.error)
    }
}

const ticketDeleted = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});

export const updateTicket = (event) => {
    return(dispatch, getState) => {

        request(`${baseUrl}/events`)
            .then(response => {
                //console.log(response.body)
                dispatch(ticketUpdated(response.body.events))
            })
            .catch(error => console.error)
    }
}

const ticketUpdated = (events) => ({
    type: 'EVENTS_FETCHED',
    payload: {
        events:events
    }
});