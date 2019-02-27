import React from 'react';
import {connect} from "react-redux";
import EventsList from './EventsList';
import {loadEvents} from '../actions/events';

class EventsListContainer extends React.Component{

    componentDidMount() {
        this.props.loadEvents();
    }

    render() {
        return(
            <div>
                <EventsList events={this.props.events}/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    events: state.events
});

export default connect(mapStateToProps, {loadEvents})(EventsListContainer);