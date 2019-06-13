import {
  ADD_TAG_FOR_EDIT_NOTE,
  ADD_FOLDER_FOR_EDIT_NOTE,
  REMOVE_TAG_FOR_EDIT_NOTE,
  REMOVE_FOLDER_FOR_EDIT_NOTE,
  ADD_NOTES_PRE_EXISTING_TAGS,
  ADD_NOTES_PRE_EXISTING_FOLDERS
} from '../actions/editNote.actions';

const initialState = {
  tags: [],
  folders: [],
  error: null
}

export default function editNoteReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TAG_FOR_EDIT_NOTE:
      return {
        ...state,
        tags: [ ...state.tags, action.tag ]
      }
    case ADD_FOLDER_FOR_EDIT_NOTE:
      return {
        ...state,
        folders: [ ...state.folders, action.folder ]
      }
    case REMOVE_TAG_FOR_EDIT_NOTE:
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.tag)
      }
    case REMOVE_FOLDER_FOR_EDIT_NOTE:
      return {
        ...state,
        folders: state.folders.filter(folder => folder !== action.folder)
      }
    case ADD_NOTES_PRE_EXISTING_TAGS:
      return {
        ...state,
        tags: action.tags
      }
    case ADD_NOTES_PRE_EXISTING_FOLDERS:
      return {
        ...state,
        folders: action.folders
      }
    default:
      return state;
  }
}

