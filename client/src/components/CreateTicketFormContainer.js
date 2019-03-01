import React from 'react';
import CreateTicketForm from './CreateTicketForm';
import {connect} from "react-redux";
import {createTicket} from '../actions/postoperations'

class CreateTicketFormContainer extends React.Component{

    state = {
        description: '',
        picture:'',
        price: 0,
        endDate: new Date()
    }

    OnSubmit = (event) => {
        event.preventDefault();
        this.props.createTicket((this.state.price, this.state.description, this.state.picture, this.state.endDate), this.props.eventId);
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <CreateTicketForm
                onSubmit={this.OnSubmit}
                onChange={this.onChange}
                values={this.state}
            />
        )
    }
}

export default connect(null, {createTicket})(CreateTicketFormContainer);