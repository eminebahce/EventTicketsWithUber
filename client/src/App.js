import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './components/Routes'
import {Link} from "react-router-dom";
//import EventsListContainer from './components/EventsListContainer';

class App extends Component {
  render() {
    return (
        <div>
          <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 mt-0">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                      aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse">
                <Link to="/login"><button className="btn btn-info btn-block mr-4 mt-1">Login</button></Link>
                <Link to="/register"><button className="btn btn-info btn-block ml-2 mt-1">Register</button></Link>
                <span className="navbar-brand mb-0 h1 ml-5">Events With Uber</span>
              </div>
            </nav>
          </div>
          <Provider store={store}>
            <Routes/>
          </Provider>
        </div>

    );
  }
}

export default App;
