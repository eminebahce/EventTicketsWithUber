import request from 'superagent';

const baseUrl = 'http://localhost:4000';

export const login = (email, password) => {
    return (dispatch) => {
        request
            .post(`${baseUrl}/logins`)
            .send({email, password})
            .then(response => {
                localStorage.setItem('user', response.body.jwt)
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
                dispatch(signupsuccess(response.body))
            })
            .catch(error => console.error);
    }
};

const signupsuccess = (user) => ({
    type:'SIGNUP_SUCCESS',
    payload: {
        user:user
    }
});


export const logout = () => {
    localStorage.removeItem('user');
    localStorage.clear();
    this.props.history.push("/");
}
