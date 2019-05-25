import {
  ADD_TAG_TO_NEW_NOTE,
  ADD_FOLDER_TO_NEW_NOTE,
  REMOVE_TAG_FROM_NEW_NOTE,
  REMOVE_FOLDER_FROM_NEW_NOTE
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
    case REMOVE_TAG_FROM_NEW_NOTE:
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.tag)
      }
    case ADD_FOLDER_TO_NEW_NOTE:
      return {
        ...state,
        folders: [ ...state.folders, action.folder ]
      }
    case REMOVE_FOLDER_FROM_NEW_NOTE:
      return {
        ...state,
        folders: state.folders.filter(folder => folder !== action.folder)
      }
    default:
      return state;
  }
}