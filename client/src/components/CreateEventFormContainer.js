import React from 'react';
import CreateEventForm from './CreateEventForm';
import {connect} from "react-redux";
import {createEvent} from '../actions/postoperations'

class CreateEventFormContainer extends React.Component{

    state = {
        name: '',
        description: '',
        picture:'',
        startDate: new Date(),
        endDate: new Date()
    }

    OnSubmit = (event) => {
        event.preventDefault();
        this.props.createEvent(
            this.state.name,
            this.state.description,
            this.state.picture,
            this.state.startDate,
            this.state.endDate
        )
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <CreateEventForm
                onSubmit={this.OnSubmit}
                onChange={this.onChange}
                values={this.state}
            />
        )
    }
}

export default connect(null, {createEvent})(CreateEventFormContainer);