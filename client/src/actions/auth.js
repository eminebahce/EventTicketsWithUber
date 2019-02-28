import request from 'superagent';

const baseUrl = 'http://localhost:4000';

export const login = (email, password) => {
    return (dispatch) => {
        request
            .post(`${baseUrl}/logins`)
            .send({email, password})
            .then(response => {
                dispatch(loginsuccess(response.body.jwt))
            })
            .catch(error => console.error);
    }
};

const loginsuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        token:token
    }
});

export const signup = (email, password) => {
    return (dispatch) => {
        request
            .post(`${baseUrl}/users`)
            .send({email, password})
            .then(response => {
                dispatch(signupsuccess(response.body.user))
            })
            .catch(error => console.error);
    }
};

const signupsuccess = (user) => ({
    type:'SIGNUP_SUCCESS',
    payload: {
        user:user
    }
})