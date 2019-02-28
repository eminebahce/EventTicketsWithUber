import React from 'react';
import {Link} from "react-router-dom";

export default function SignUpForm(props) {

    return(
        <div>
            <h2>REGISTER</h2>
            <form onSubmit={props.onSubmit}>
                <label>
                    email:
                    <input type="email" name="email" onChange={props.onChange} value={props.values.email}/>
                </label>
                <label>
                    password:
                    <input type="password" name="password" onChange={props.onChange} value={props.values.password} />
                </label>
                <button type="submit">Register</button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    )
}