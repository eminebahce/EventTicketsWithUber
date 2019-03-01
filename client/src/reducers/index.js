import {combineReducers} from "redux";
import events from './events';
import auth from './auth'
import postoperations from './postoperations'

export default combineReducers({
    events,
    auth,
    postoperations
});