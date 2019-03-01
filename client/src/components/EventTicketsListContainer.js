import React from 'react';
import EventTicketsList from './EventTicketsList';
import {connect} from "react-redux";
import {loadTickets} from '../actions/events';
import {deleteTicket, updateTicket} from '../actions/postoperations';
import CreateTicketFormContainer from './CreateTicketFormContainer';

class EventTicketsListContainer extends React.Component{

    state = {
        ticketeditMode: false,
        formValues: {}
    };

    componentDidMount = () => {
        this.props.loadTickets(this.props.match.params.id);
    };

    onDelete = (id) => {
        this.props.deleteTicket(id);
        this.props.history.push(`/events/${this.props.match.params.id}/tickets`);
    };

    onEdit = (ticket) => {
        this.setState({
            ticketeditMode: true,
            formValues: {
                id:ticket.id,
                description: ticket.description,
                picture: ticket.picture,
                startDate: ticket.startDate,
                price: ticket.price
            }
        });
    };

    onChange = (event) => {
        this.setState({
            formValues: {
                ...this.state.formValues,
                [event.target.name]: event.target.value
            }
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            ticketeditMode: false
        });
        this.props.updateTicket(this.state.formValues);
    };

    render(){
        return(
            <div>
                <EventTicketsList
                    tickets={this.props.tickets}
                    eventId={this.props.match.params.id}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    values={this.state.formValues}
                    ticketeditMode={this.state.ticketeditMode}
                />
                <CreateTicketFormContainer eventId={this.props.match.params.id} />
            </div>
        )
    };

}

const mapStateToProps =(state) =>({
    tickets: state.events
});

export default connect(mapStateToProps, {loadTickets})(EventTicketsListContainer);