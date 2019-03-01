import request from 'superagent';

const baseUrl = 'http://localhost:4000';

export const createEvent = (event) => {
    return(dispatch, getState) => {

        request
            .post(`${baseUrl}/events`)
            .send(event)
            .then(response => {
                //console.log(response.body)
                dispatch(eventCreated(response.body))
            })
            .catch(error => console.error)
    }
}

const eventCreated = (event) => ({
    type: 'EVENT_CREATE_SUCCESS',
    payload: {
        event:event
    }
});

export const createTicket = (ticket, eventId) => {
    return(dispatch, getState) => {

        request
            .post(`${baseUrl}/events/${eventId}/tickets`)
            .send(ticket)
            .then(response => {
                //console.log(response.body)
                dispatch(ticketCreated(response.body))
            })
            .catch(error => console.error)
    }
}

const ticketCreated = (ticket) => ({
    type: 'TICKET_CREATE_SUCCESS',
    payload: {
        ticket:ticket
    }
});

export const createComment = (comment, eventId, ticketId) => {
    return(dispatch, getState) => {

        request
            .post(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments`)
            .send(comment)
            .then(response => {
                //console.log(response.body)
                dispatch(commentCreated(response.body))
            })
            .catch(error => console.error)
    }
}

const commentCreated = (comment) => ({
    type: 'COMMENT_CREATE_SUCCESS',
    payload: {
        comment:comment
    }
});

export const updateEvent = (event) => {
    return(dispatch, getState) => {

        request
            .post(`${baseUrl}/events/${event.id}`)
            .send(event)
            .then(response => {
                //console.log(response.body)
                dispatch(eventUpdated(response.body))
            })
            .catch(error => console.error)
    }
}

const eventUpdated = (eventUpdate) => ({
    type: 'EVENT_UPDATE_SUCCESS',
    payload: {
        eventUpdate:eventUpdate
    }
});

export const updateTicket = (ticket) => {
    return(dispatch, getState) => {

        request
            .post(`${baseUrl}/ticket/${ticket.id}`)
            .send(ticket)
            .then(response => {
                //console.log(response.body)
                dispatch(ticketUpdated(response.body))
            })
            .catch(error => console.error)
    }
}

const ticketUpdated = (ticketUpdate) => ({
    type: 'TICKET_UPDATE_SUCCESS',
    payload: {
        ticketUpdate:ticketUpdate
    }
});

export const deleteEvent = (id) => {
    return(dispatch, getState) => {

        request
            .delete(`${baseUrl}/events/${id}`)
            .then(response => {
                //console.log(response.body)
                dispatch(eventDeleted(id))
            })
            .catch(error => console.error)
    }
}

const eventDeleted = (deletedEventId) => ({
    type: 'EVENT_DELETE_SUCCESS',
    payload: {
        deletedEventId:deletedEventId
    }
});

export const deleteTicket = (id, eventId) => {
    return(dispatch, getState) => {

        request
            .delete(`${baseUrl}/events/${eventId}/tickets/${id}`)
            .then(response => {
                //console.log(response.body)
                dispatch(ticketDeleted(id))
            })
            .catch(error => console.error)
    }
}

const ticketDeleted = (deletedTicketId) => ({
    type: 'TICKET_DELETE_SUCCESS',
    payload: {
        deletedTicketId:deletedTicketId
    }
});

