import React from 'react';
import EventsListContainer from './EventsListContainer';
import EventTicketsListContainer from './EventTicketsListContainer';
import TicketCommentsListContainer from './TicketCommentsListContainer';
import LoginFormContainer from './LoginFormContainer';
import SignUpFormContainer from './SignUpFormContainer';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {withRouter} from "react-router";

function Routes (props) {
    return(
        <div>
            <Route path="/" exact component={EventsListContainer} />
            <Route path="/events/:id/tickets" exact component={EventTicketsListContainer} />
            <Route path="/events/:id/tickets/:ticketId" exact component={TicketCommentsListContainer}/>
            <Route path="/login" exact component={LoginFormContainer}/>
            <Route path="/register" exact component={SignUpFormContainer}/>
        </div>
    );
}
const mapStateToProps = (state) =>({state})

export default withRouter(connect(mapStateToProps)(Routes))