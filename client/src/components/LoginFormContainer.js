import react from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {login} from '../actions/auth';

class LoginFormContainer extends React.Component{

    state = {
        email: '',
        password: ''
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <LoginForm onsubmit={this.onSubmit} onchange={this.onChange} values={this.state}/>
        )
    }
}

export default connect(null, {login})(LoginFormContainer)