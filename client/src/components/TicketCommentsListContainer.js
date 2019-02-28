import React from 'react';
import TicketCommentsList from './TicketCommentsList';
import {connect} from "react-redux";
import {loadComments} from '../actions/events';

class TicketCommentsListContainer extends React.Component{

    componentDidMount() {
        this.props.loadComments(Number(this.props.match.params.id),Number(this.props.match.params.ticketId));
    }

    render(){
        return(
            <TicketCommentsList comments={this.props.comments} />
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.events
});

export default connect(mapStateToProps, {loadComments})(TicketCommentsListContainer);