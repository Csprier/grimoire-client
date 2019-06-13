import Axios from 'axios';
import { API_BASE_URL } from '../config';

export const ADD_TAG_FOR_EDIT_NOTE = 'ADD_TAG_FOR_EDIT_NOTE',
  addTagForEditNote = (tag) => {
    return {
      type: ADD_TAG_FOR_EDIT_NOTE,
      tag
    }
  }

export const ADD_FOLDER_FOR_EDIT_NOTE = 'ADD_FOLDER_FOR_EDIT_NOTE',
  addFolderForEditNote = (folder) => {
    return {
      type: ADD_FOLDER_FOR_EDIT_NOTE,
      folder
    }
  }

export const REMOVE_TAG_FOR_EDIT_NOTE = 'REMOVE_TAG_FOR_EDIT_NOTE',
  removeTagForEditNote = (tag) => {
    return {
      type: REMOVE_TAG_FOR_EDIT_NOTE,
      tag
    }
  }

export const REMOVE_FOLDER_FOR_EDIT_NOTE = 'REMOVE_FOLDER_FOR_EDIT_NOTE',
  removeFolderForEditNote = (folder) => {
    return {
      type: REMOVE_FOLDER_FOR_EDIT_NOTE,
      folder
    }
  }

export const ADD_NOTES_PRE_EXISTING_TAGS = 'ADD_NOTES_PRE_EXISTING_TAGS',
  addNotesPreExistingTags = (tags) => {
    return {
      type: ADD_NOTES_PRE_EXISTING_TAGS,
      tags
    }
  }
export const ADD_NOTES_PRE_EXISTING_FOLDERS = 'ADD_NOTES_PRE_EXISTING_FOLDERS',
  addNotesPreExistingFolders = (folders) => {
    return {
      type: ADD_NOTES_PRE_EXISTING_FOLDERS,
      folders
    }
  }

export const TOGGLE_RENDER_TAG_INPUT = 'TOGGLE_RENDER_TAG_INPUT',
  renderTagInputAction = () => {
    return {
      type: TOGGLE_RENDER_TAG_INPUT
    }
  }
  export const TOGGLE_RENDER_FOLDER_INPUT = 'TOGGLE_RENDER_FOLDER_INPUT',
  renderFolderInputAction = () => {
    return {
      type: TOGGLE_RENDER_FOLDER_INPUT
    }
  }

// ========================================================
// PUT REQUEST TO EDIT A NOTE BY ID
// ========================================================
export const EDIT_NOTE_PUT_REQUEST = 'EDIT_NOTE_PUT_REQUEST',
editNotePutRequest = (id, note) => (dispatch, getState) => {
  console.log(`editNotePutRequest(${id})`);
  let url = `${API_BASE_URL}/notes/${id}`;
  const authToken = getState().auth.authToken;
  return Axios.put(url, note, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'bearer ' + authToken
    }
  })
  .then(res => {
    console.log('PUT RESPONSE', res)
  })
  .catch((err) => console.error(err));
}
