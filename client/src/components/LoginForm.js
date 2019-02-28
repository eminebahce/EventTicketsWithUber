import React from 'react';
import {Link} from "react-router-dom";
import LoginandSignup from '../LoginandSignup.css';

export default function LoginForm(props) {

    return(
        <div className="wrapper">
            <form className="form-signin" onSubmit={props.onSubmit}>
                <h2 className="form-signin-heading">LOGIN</h2>
                    <input
                        type="email"
                        name="email"
                        onChange={props.onChange}
                        value={props.values.email}
                        className="form-control"
                        placeholder="Email Address"
                        autoFocus=""
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={props.onChange}
                        value={props.values.password}
                        className="form-control"
                        placeholder="Password"
                    />
                <button className="btn btn-info btn-block" type="submit">Login</button>
                <Link to="/register"><button className="btn btn-info btn-block mt-1">Register</button></Link>

            </form>
        </div>
    );
}
