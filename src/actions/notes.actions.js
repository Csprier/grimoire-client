import Axios from 'axios';
import { API_BASE_URL } from '../config';

import { clearReduxTagChips, clearReduxFolderChips } from '../actions/createNote.actions';

// =======================================================
// GET NOTE ACTIONS
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
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'bearer ' + authToken
      }
    })
    .then((res) => {
      const notesData = res.data.map(note => ({
          id: note._id,
          title: note.title,
          content: note.content,
          tags: note.tags,
          folders: note.folders
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

export const ADD_NOTE = 'ADD_NOTE',
  addNote = (note) => {
    return {
      type: ADD_NOTE,
      note
    }
  }

export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS',
  addNoteSuccess = () => {
    return {
      type: ADD_NOTE_SUCCESS
    }
  }

export const ADD_NOTE_ERROR = 'ADD_NOTE_ERROR',
  addNoteError = (error) => {
    return {
      type: ADD_NOTE_ERROR,
      error
    }
  }

export const addNewNote = (newNote) => (dispatch, getState) => {
  dispatch(addNoteRequest());
  const authToken = getState().auth.authToken;
  const url = `${API_BASE_URL}/notes`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'bearer ' + authToken
    }
  }
  
  return Axios.post(url, newNote, options)
    .then((res) => {
      let note = {
        title: res.data.title,
        content: res.data.content,
        tags: res.data.tags,
        folders: res.data.folders
      }
      dispatch(addNote(note));
      dispatch(getNotes());
      dispatch(addNoteSuccess());
      dispatch(clearReduxTagChips());
      dispatch(clearReduxFolderChips());
    })
    .catch(e => { 
      console.error('Note POST Error', e);
      dispatch(addNoteError(e));
    });
}

// =======================================================
// DELETE NOTE ACTIONS
// =======================================================
export const DELETE_NOTE_REQUEST = 'DELETE_NOTE_REQUEST',
  deleteNoteRequest = () => {
    return {
      type: DELETE_NOTE_REQUEST
    }
  }

export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS',
  deleteNoteSuccess = () => {
    return {
      type: DELETE_NOTE_SUCCESS
    }
  }

export const DELETE_NOTE_ERROR = 'DELETE_NOTE_ERROR',
  deleteNoteError = (error) => {
    return {
      type: DELETE_NOTE_ERROR,
      error
    }
  }

  export const deleteNoteById = (noteId) => (dispatch, getState) => {
    dispatch(deleteNoteRequest());
    const authToken = getState().auth.authToken;
    const url = `${API_BASE_URL}/notes/${noteId}`;
  
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'bearer ' + authToken
      },
    }
    
    return Axios.delete(url, options)
      .then(() => {
        dispatch(deleteNoteSuccess());
        dispatch(getNotes());
      })
      .catch(e => { 
        console.error(e);
        dispatch(deleteNoteError(e));
      });
  }

// TOGGLE EDIT MODE IN REDUCER INITIAL STATE FOR EDITING SINGLE NOTES
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE',
  toggleEditMode = () => {
    return {
      type: TOGGLE_EDIT_MODE
    }
  }

export const NOTE_TO_EDIT = 'NOTE_TO_EDIT',
  noteToEdit = (noteId) => {
    return {
      type: NOTE_TO_EDIT,
      noteId
    }
  }

export const GET_NOTE_BY_ID_TO_EDIT = 'GET_NOTE_BY_ID_TO_EDIT',
  getNoteByIdToEdit = (id) => (dispatch, getState) => {
    let url = `${API_BASE_URL}/notes/${id}`;
    const authToken = getState().auth.authToken;
    return Axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'bearer ' + authToken
      }
    })
    .then(res => {
      let noteToEdit = {
        id: res.data._id,
        title: res.data.title,
        content: res.data.content,
        tags: (res.data.tags === undefined) ? [] : res.data.tags.map(tag => tag.name),
        folders: (res.data.folders === undefined) ? [] : res.data.folders.map(folder => folder.name)
      }
      return noteToEdit;
    })
    .catch(e => console.error(e));
  }

