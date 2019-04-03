import Axios from 'axios';
import { API_BASE_URL } from '../config';

export const GET_NOTES_REQUEST = 'GET_NOTES_REQUEST',
  getNotesRequest = () => {
    return {
      type: GET_NOTES_REQUEST
    }
  }

export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS',
  getNotesSuccess = (data) => {
    return {
      type: GET_NOTES_SUCCESS,
      data
    }
  }

export const GET_NOTES_ERROR = 'GET_NOTES_ERROR',
  getNotesError = (error) => {
    return {
      type: GET_NOTES_ERROR,
      error
    }
  }

export const getNotes = () => (dispatch, getState) => {
  dispatch(getNotesRequest());
  const authToken = getState().auth.authToken;
  let url = `${API_BASE_URL}/notes`;

  return Axios.get(url, {
      headers: {
        'Authorization': "bearer " + authToken
      }
    })
    .then((res) => {
      dispatch(getNotesSuccess(res.data));
    })
    .catch(e => {
      console.error(e);
      dispatch(getNotesError(e));
    });
}