import React from 'react';
import EventTicketsList from './EventTicketsList';
import {connect} from "react-redux";
import {loadTickets} from '../actions/events';

class EventTicketsListContainer extends React.Component{

    componentDidMount(){
        this.props.loadTickets(Number(this.props.match.params.id));
    }

    render(){
        return(
            <EventTicketsList tickets={this.props.tickets}/>
        )
    }

}

const mapStateToProps =(state) =>({
    tickets: state.events
});

export default connect(mapStateToProps, {loadTickets})(EventTicketsListContainer)