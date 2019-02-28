import React from 'react';
import {Link} from "react-router-dom";

export default function LoginForm(props) {

    return(
        <div>
            <h2>LOGIN</h2>
            <form onSubmit={props.onSubmit}>
                <label>
                    email:
                    <input type="email" name="email" onChange={props.onChange} value={props.values.email}/>
                </label>
                <label>
                    password:
                    <input type="password" name="password" onChange={props.onChange} value={props.values.password} />
                </label>
                <button type="submit">Login</button>
                <Link to="/register">Register</Link>
            </form>
        </div>
    )
}