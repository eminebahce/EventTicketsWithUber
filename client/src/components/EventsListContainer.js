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
        this.props.history.push('/')
    };

    onEdit = (event) => {
       this.setState({
           editMode: true,
           formValues: {
               id: event.id,
               name: event.name,
               description: event.description,
               image: event.image,
               startDate: event.startDate,
               endDate: event.endDate
           }
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
      this.setState({
          editMode: false
      })
        this.props.updateEvent(this.state.formValues);
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

const mapStateToProps = (state) =>({
    events: state.events
});

export default connect(mapStateToProps, {loadEvents, deleteEvent, updateEvent})(EventsListContainer);