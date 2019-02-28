
const reducer = (state= null, action = {}) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return action.payload.token
        case 'SIGNUP_SUCCESS':
            return action.payload.user
        default:
            return state;
    }
};