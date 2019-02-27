import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './components/Routes'
//import EventsListContainer from './components/EventsListContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
       <Routes/>
      </Provider>
    );
  }
}

export default App;
