
const reducer = (state = null, action = {}) => {
    //console.log(action);
    switch (action.type) {
        case 'EVENTS_FETCHED':
            return action.payload.events;
        case 'TICKETS_FETCHED':
            return action.payload.tickets;
        default:
            return state;
    }
}

export default reducer;