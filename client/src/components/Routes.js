import React from 'react';
import EventsListContainer from './EventsListContainer';
import EventTicketsListContainer from './EventTicketsListContainer';
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {withRouter} from "react-router";

function Routes (props) {
    return(
        <div>
            <Route path="/" exact component={EventsListContainer} />
            <Route path="/events/:id/tickets" component={EventTicketsListContainer} />
        </div>
    );
}
const mapStateToProps = (state) =>({state})

export default withRouter(connect(mapStateToProps)(Routes))