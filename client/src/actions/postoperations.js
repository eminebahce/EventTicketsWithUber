import request from 'superagent';

const baseUrl = 'http://localhost:4000';

export const createEvent = (event) => {
    return(dispatch, getState) => {
        const jwt = getState().auth;
        request
            .post(`${baseUrl}/events`)
            .set('Authorization', 'Bearer ' + jwt.auth)
            .send(event)
            .then(response => {
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
        const jwt = getState().auth;
        request
            .post(`${baseUrl}/events/${eventId}/tickets`)
            .set('Authorization', 'Bearer ' + jwt.auth)
            .send(ticket)
            .then(response => {
                console.log(response.body)
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
        const jwt = getState().auth;
        request
            .post(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments`)
            .set('Authorization', 'Bearer ' + jwt.auth)
            .send(comment)
            .then(response => {
                //console.log(response.body)
                dispatch(commentCreated(response.body[0]))
            })
            .catch(error => console.error)
    }
}

const commentCreated = (comments) => ({
    type: 'COMMENT_CREATE_SUCCESS',
    payload: {
        comments:comments
    }
});

export const updateEvent = (event) => {
    return(dispatch, getState) => {
        const jwt = getState().auth;
        request
            .put(`${baseUrl}/events/${event.id}`)
            .set('Authorization', 'Bearer ' + jwt.auth)
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

export const updateTicket = (eventId, ticket) => {
    return(dispatch, getState) => {
        const jwt = getState().auth;
        request
            .put(`${baseUrl}/events/${eventId}/tickets/${ticket.id}`)
            .set('Authorization', 'Bearer ' + jwt.auth)
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
        const jwt = getState().auth;
        request
            .delete(`${baseUrl}/events/${id}`)
            .set('Authorization', 'Bearer ' + jwt.auth)
            .then(response => {
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
        const jwt = getState().auth;
        request
            .delete(`${baseUrl}/events/${eventId}/tickets/${id}`)
            .set('Authorization', 'Bearer ' + jwt.auth)
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

export const deleteComment = (eventId,ticketId, commentId) => {
    return(dispatch, getState) => {
        const jwt = getState().auth;
        request
            .delete(`${baseUrl}/events/${eventId}/tickets/${ticketId}/comments/${commentId}`)
            .set('Authorization', 'Bearer ' + jwt.auth)
            .then(response => {
                console.log(response.body[0])
                dispatch(commentDeleted(response.body[0]))
            })
            .catch(error => console.error)
    }
}

const commentDeleted = (comments) => ({
    type: 'COMMENT_DELETE_SUCCESS',
    payload: {
        comments:comments
    }
});

