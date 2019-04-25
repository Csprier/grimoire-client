import Axios from 'axios';
import { API_BASE_URL } from '../config';

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
      console.log(res);
      let note = {
        title: res.data.title,
        content: res.data.content,
        tags: res.data.tags
      }
      // dispatch(addNote(note));
      // dispatch(addNoteSuccess());
      // dispatch(getNotes());
    })
    .catch(e => { 
      console.error(e);
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

// =======================================================
// REMOVE TAG FROM NOTE ACTIONS
// =======================================================
export const REMOVE_TAG_FROM_NOTE_REQUEST = 'REMOVE_TAG_FROM_NOTE_REQUEST',
  removeTagFromNoteRequest = () => {
    return {
      type: REMOVE_TAG_FROM_NOTE_REQUEST
    }
  }

export const REMOVE_TAG_FROM_NOTE = 'REMOVE_TAG_FROM_NOTE',
  removeTagFromNote = (tag) => {
    return {
      type: REMOVE_TAG_FROM_NOTE,
      tag
    }
  }

export const REMOVE_TAG_FROM_NOTE_SUCCESS = 'REMOVE_TAG_FROM_NOTE_SUCCESS',
removeTagFromNoteSuccess = () => {
  return {
    type: REMOVE_TAG_FROM_NOTE_SUCCESS
  }
}

export const REMOVE_TAG_FROM_NOTE_ERROR = 'REMOVE_TAG_FROM_NOTE_ERROR',
removeTagFromNoteError = (error) => {
  return {
    type: REMOVE_TAG_FROM_NOTE_REQUEST,
    error
  }
}

export const removeTagFromNoteById = (note, tagId) => (dispatch, getState) => {
  dispatch(removeTagFromNoteRequest());
  const authToken = getState().auth.authToken;
  const url = `${API_BASE_URL}/notes/${note.id}`;

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'bearer ' + authToken
    }
  };

  let updatedNote = {
    id: note.id,
    title: note.title,
    content: note.content,
    folderId: note.folderId || '',
    tags: note.tags.filter(tag => tag._id !== tagId)
  }
  return Axios.patch(url, updatedNote, options)
    .then(() => {
      dispatch(removeTagFromNoteSuccess());
      dispatch(getNotes());
    })
    .catch(e => {
      console.error(e);
      dispatch(removeTagFromNoteError(e));
    });
}