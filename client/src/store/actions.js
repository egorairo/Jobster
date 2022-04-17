import * as actionTypes from './actionTypes';

export const putJobs = (jobs) => ({
  type: actionTypes.PUT_JOBS,
  payload: jobs,
});

export const putTitle = (title) => ({
  type: actionTypes.PUT_TITLE,
  payload: title,
});

export const putLocation = (location) => ({
  type: actionTypes.PUT_LOCATION,
  payload: location,
});
