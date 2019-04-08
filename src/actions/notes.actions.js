import Axios from 'axios';
import { API_BASE_URL } from '../config';

// =======================================================
export const GET_NOTES_REQUEST = 'GET_NOTES_REQUEST',
  getNotesRequest = () => {
    return {
      type: GET_NOTES_REQUEST
    }
  }

export const GET_NOTES_DATA = 'GET_NOTES_DATA',
  getNotesData = (data) => {
    return {
      type: GET_NOTES_DATA,
      data
    }
  }

export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS',
  getNotesSuccess = () => {
    return {
      type: GET_NOTES_SUCCESS,
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
        'Authorization': 'bearer ' + authToken
      }
    })
    .then((res) => {
      const notesData = res.data.map(note => ({
          id: note._id,
          title: note.title,
          content: note.content,
          folderId: note.folderId,
          tags: note.tags
        }));
      dispatch(getNotesData(notesData));
      dispatch(getNotesSuccess());
    })
    .catch(e => {
      console.error(e);
      dispatch(getNotesError(e));
    });
}


// =======================================================
// FILTER ACTIONS
// =======================================================
export const FILTER_NOTES = 'FILTERED_NOTES',
  filterNotes = (filteredNotes) => {
    return {
      type: FILTER_NOTES,
      filteredNotes
    }
  }

export const FILTER_NOTES_SUCCESS = 'FILTERED_NOTES_SUCCESS',
  filterNotesSuccess = () => {
    return {
      type: FILTER_NOTES_SUCCESS,
    }
  }

// =======================================================
// ADD NOTE ACTIONS
// =======================================================
export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST',
  addNoteRequest = () => {
    return {
      type: ADD_NOTE_REQUEST
    }
  }

export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS',
  addNoteSuccess = () => {
    return {
      type: ADD_NOTE_SUCCESS
    }
  }

export const addNote = (title, content, userId, tags = [], folderId = '') => (dispatch, getState) => {
  dispatch(getNotesRequest());
  const authToken = getState().auth.authToken;
  const url = `${API_BASE_URL}/notes`;
  const newNote = { title, content, tags, folderId, userId };

  // return Axios.post(url, newNote, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Authorization': 'bearer ' + authToken
  //   }
  // })
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'bearer ' + authToken
    },
    body: JSON.stringify(newNote)
  }
  return fetch(url, options)
  .then((res) => {
    res.json()
    console.log('POST response', res);
  })
  .catch(e => {
    console.error(e);
    dispatch(getNotesError(e));
  });
}