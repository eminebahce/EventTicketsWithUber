import React from 'react';
import EventsListContainer from './EventsListContainer';
import EventTicketsListContainer from './EventTicketsListContainer';
import TicketCommentsListContainer from './TicketCommentsListContainer';
import CreateEventFormContainer from './CreateEventFormContainer';
import CreateTicketFormContainer from './CreateTicketFormContainer';
import LoginFormContainer from './LoginFormContainer';
import SignUpFormContainer from './SignUpFormContainer';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {withRouter} from "react-router";

function Routes(props) {
    return (
        <div>
                <Route path="/" exact component={EventsListContainer}/>
                <Route path="/events/:id/tickets" exact component={EventTicketsListContainer}/>
                <Route path="/events/:id/tickets/:ticketId" exact component={TicketCommentsListContainer}/>
                <Route path="/login" exact component={LoginFormContainer}/>
                <Route path="/register" exact component={SignUpFormContainer}/>
                <Route path="/createEvent" exact component={CreateEventFormContainer}/>
                <Route path="/createTicket/:id" exact component={CreateTicketFormContainer}/>

        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps)(Routes))