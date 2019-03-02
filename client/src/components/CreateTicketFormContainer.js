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
        this.props.createTicket({
           'price': this.state.price,
            'description':this.state.description,
            'picture':this.state.picture,
           'endDate': this.state.endDate
        }, this.props.match.params.id);
        this.props.history.push(`/events/${this.props.match.params.id}/tickets`);
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