import * as actionTypes from './actionTypes';
import {combineReducers} from 'redux';

function putJobsReducer(state = {}, action) {
  if (action.type === actionTypes.PUT_JOBS) {
    return action.payload;
  }

  return state;
}

function putTitleReducer(state = '', action) {
  if (action.type === actionTypes.PUT_TITLE) {
    return {...state, title: action.payload};
  }

  return state;
}

function putLocationReducer(state = '', action) {
  if (action.type === actionTypes.PUT_LOCATION) {
    return {...state, location: action.payload};
  }

  return state;
}

export const reducer = combineReducers({
  jobs: putJobsReducer,
  title: putTitleReducer,
  location: putLocationReducer,
});
