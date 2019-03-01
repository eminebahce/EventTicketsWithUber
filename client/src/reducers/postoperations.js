
const reducer =(state = null, action = {}) => {
    switch (action.type) {
        case 'EVENT_CREATE_SUCCESS':
            return [...state, action.payload.event];
        case 'TICKET_CREATE_SUCCESS':
            return [...state, action.payload.ticket];
        case 'COMMENT_CREATE_SUCCESS':
            return [...state, action.payload.commment];
        default:
            return state;
    }
};

export default reducer;