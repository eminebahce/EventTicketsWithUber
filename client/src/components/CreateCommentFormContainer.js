import React from 'react';
import CreateCommentForm from './CreateCommentForm';
import {connect} from "react-redux";
import {createComment} from '../actions/postoperations'

class CreateCommentFormContainer extends React.Component{

    state = {
        text: '',
        author:'',
    }

    OnSubmit = (event) => {
        event.preventDefault();
        this.props.createComment((this.state.text, this.state.author), this.props.eventId, this.props.ticketId);
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <CreateCommentForm
                onSubmit={this.OnSubmit}
                onChange={this.onChange}
                values={this.state}
            />
        )
    }
}

export default connect(null, {createComment})(CreateCommentFormContainer);