import {
  ADD_TAG_TO_NEW_NOTE,
  ADD_FOLDER_TO_NEW_NOTE
} from '../actions/createNote.actions';

const initialState = {
  title: '',
  content: '',
  tags: [],
  folders: [],
  error: null
}

export default function createNoteReducers(state = initialState, action) {
  switch(action.type) {
    case ADD_TAG_TO_NEW_NOTE:
      return {
        ...state,
        tags: [ ...state.tags, action.tag]
      }
    case ADD_FOLDER_TO_NEW_NOTE:
      return {
        ...state,
        folders: [ ...state.folders, action.folder ]
      }
    default:
      return state;
  }
}