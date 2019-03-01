import React from 'react';
import TicketCommentsList from './TicketCommentsList';
import {connect} from "react-redux";
import {loadComments} from '../actions/events';

class TicketCommentsListContainer extends React.Component{

    componentDidMount() {
        this.props.loadComments(this.props.match.params.id,this.props.match.params.ticketId);
    }

    render(){
        return(
            <TicketCommentsList
                comments={this.props.comments}
                eventId={this.props.match.params.id}
                ticketId={this.props.match.params.ticketId}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    comments: state.events
});

export default connect(mapStateToProps, {loadComments})(TicketCommentsListContainer);