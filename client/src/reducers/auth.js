const initialState = {
    auth: {}
}
const reducer = (state= initialState, action = {}) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                auth: action.payload.token
            };

        case 'SIGNUP_SUCCESS':
            return {
                auth: action.payload.user
            }
        default:
            return state;
    }
};

export default reducer;