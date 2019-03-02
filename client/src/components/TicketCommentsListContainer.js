import React from 'react';
import TicketCommentsList from './TicketCommentsList';
import {connect} from "react-redux";
import {loadComments} from '../actions/events';
import {deleteComment} from '../actions/postoperations';

class TicketCommentsListContainer extends React.Component{

    componentDidMount() {
        this.props.loadComments(this.props.match.params.id, this.props.match.params.ticketId);
    }

    onDelete = (commentId) => {
        this.props.deleteComment(this.props.match.params.id, this.props.match.params.ticketId, commentId);
    }

    render(){
        return(
            <TicketCommentsList
                comments={this.props.comments}
                eventId={this.props.match.params.id}
                ticketId={this.props.match.params.ticketId}
                onDelete={this.onDelete}
            />
        );
    }
}

const mapStateToProps = (state) => {
    //  console.log(state.postoperations.comments);
    return {
        comments: state.postoperations.comments
    }
};

export default connect(mapStateToProps, {loadComments,deleteComment})(TicketCommentsListContainer);