import React from 'react';
import {connect} from "react-redux";
import EventsList from './EventsList';
import {loadEvents} from '../actions/events';
import {deleteEvent, updateEvent} from '../actions/postoperations';

class EventsListContainer extends React.Component {

    state = {
        editMode: false,
        formValues: {},
        skip: 0,
    };

    componentDidMount() {
        this.props.loadEvents();
    };

    onLoadEvents = (totalPages) => {
        if (totalPages === 1 ){

        } else if ((this.state.skip * 9) > totalPages) {
            this.props.loadEvents(0);
            this.setState({skip: 0})
        } else {
            this.props.loadEvents((this.state.skip + 1) * 9);
            this.setState({skip: this.state.skip + 1})
        }
    }

    onDelete = (id) => {
        this.props.deleteEvent(id);
        window.location = "/";
    };

    onEdit = (event) => {
        //console.log(event);
        this.setState({
            formValues: {
                id: event.id,
                name: event.name,
                description: event.description,
                picture: event.picture,
                startDate: event.startDate,
                endDate: event.endDate
            },
            editMode: true
        })
    };

    onChange = (event) => {
        this.setState({
            formValues: {
                ...this.state.formValues,
                [event.target.name]: event.target.value
            }
        })
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.updateEvent(this.state.formValues);
        this.setState({
            editMode: false
        })
    };

    render() {
        return (
            <div>
                <EventsList
                    events={this.props.events}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    values={this.state.formValues}
                    editMode={this.state.editMode}
                    total={this.props.total}
                    onSkipPage={this.onLoadEvents}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.postoperations.events,
        total: state.postoperations.totalEvents
    }
};

export default connect(mapStateToProps, {loadEvents, deleteEvent, updateEvent})(EventsListContainer);