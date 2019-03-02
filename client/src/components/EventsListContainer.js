import React from 'react';
import {connect} from "react-redux";
import EventsList from './EventsList';
import {loadEvents} from '../actions/events';
import {deleteEvent, updateEvent} from '../actions/postoperations';

class EventsListContainer extends React.Component{

    state = {
        editMode: false,
        formValues:{}
    };

    componentDidMount() {
        this.props.loadEvents();
    };

    onDelete = (id) => {
        this.props.deleteEvent(id);
        this.props.history.push('/');
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
        return(
            <div>
                <EventsList
                    events={this.props.events}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    values={this.state.formValues}
                    editMode={this.state.editMode}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.postoperations.events
    }
};

export default connect(mapStateToProps, {loadEvents, deleteEvent, updateEvent})(EventsListContainer);