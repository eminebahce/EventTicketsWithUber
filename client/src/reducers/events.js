
const reducer = (state = null, action = {}) => {
    //console.log(action);
    switch (action.type) {
        case 'EVENTS_FETCHED':
            return action.payload.events;
        case 'TICKETS_FETCHED':
            return action.payload.tickets;
        case 'COMMENTS_FETCHED':
            return action.payload.comments;
        default:
            return state;
    }
}

export default reducer;