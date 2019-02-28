import React from 'react';
import CreateEventForm from './CreateEventForm';
import {connect} from "react-redux";
import {createComment} from '../actions/postoperations'

class CreateCommentFormContainer extends React.Component{

    state = {
        text: '',
        author:'',
    }

    OnSubmit = (event) => {
        event.preventDefault();
        this.props.createComment(
            this.state.text,
            this.state.author,
        )
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

export default connect(null, {createComment})(CreateCommentFormContainer);