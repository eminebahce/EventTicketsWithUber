import request from 'superagent';

const baseUrl = 'http://localhost:4000';

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