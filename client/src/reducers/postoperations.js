const initialState = {
  events: [],
  tickets: [],
  comments: [],
};


const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'EVENTS_FETCHED':
            return {
                ...state,
                events: action.payload.events
            }
        case 'TICKETS_FETCHED':
            return {
                ...state,
                tickets:action.payload.tickets
            }
        case 'COMMENTS_FETCHED':
            return {
                ...state,
                comments: action.payload.comments,
            }
        case 'EVENT_CREATE_SUCCESS':
            return {
                ...state,
                events: [...state.events, action.payload.event]
            }
        case 'TICKET_CREATE_SUCCESS':
            return {
                ...state,
                tickets: [...state.tickets, action.payload.ticket ]
            }
        case 'COMMENT_CREATE_SUCCESS':
            return {
                ...state,
                comments: action.payload.comments
            }
        case 'EVENT_UPDATE_SUCCESS':
            state.events = state.events.filter(event => event.id !== action.payload.eventUpdate.id);

            if (new Date(action.payload.eventUpdate.endDate) > new Date()) {
                state.events = [...state.events, action.payload.eventUpdate];
            }

            return {
                ...state,
                events: state.events
            };
        case 'TICKET_UPDATE_SUCCESS':
            state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload.ticketUpdate.id)

            if (new Date(action.payload.ticketUpdate.endDate) > new Date()) {
                state.tickets = [...state.tickets, action.payload.ticketUpdate];
            }

            return {
                ...state,
                tickets: state.tickets
            }
        case 'EVENT_DELETE_SUCCESS':
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload.deletedEventId)
            }
        case 'TICKET_DELETE_SUCCESS':
            return {
                ...state,
                tickets: state.tickets.filter(ticket => ticket.id !== action.payload.deletedTicketId)
            }
        case 'COMMENT_DELETE_SUCCESS':
            return {
                ...state,
                comments: action.payload.comments
            }
        default:
            return state;
    }
};

export default reducer;