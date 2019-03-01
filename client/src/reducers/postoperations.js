
const reducer =(state = null, action = {}) => {
    switch (action.type) {
        case 'EVENT_CREATE_SUCCESS':
            return [...state, action.payload.event];
        case 'TICKET_CREATE_SUCCESS':
            return [...state, action.payload.ticket];
        case 'COMMENT_CREATE_SUCCESS':
            return [...state, action.payload.commment];
        case 'EVENT_UPDATE_SUCCESS':
            return action.payload.eventUpdate;
        case 'TICKET_UPDATE_SUCCESS':
            return action.payload.ticketUpdate
        case 'EVENT_DELETE_SUCCESS':
            return (state && state.filter(event => event.id === action.payload.deletedEventId))
        case 'TICKET_DELETE_SUCCESS':
            return (state && state.filter(ticket => ticket.id === action.payload.deletedTicketId))
        default:
            return state;
    }
};

export default reducer;