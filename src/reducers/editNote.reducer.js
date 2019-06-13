import {
  ADD_TAG_FOR_EDIT_NOTE,
  ADD_FOLDER_FOR_EDIT_NOTE,
  REMOVE_TAG_FOR_EDIT_NOTE,
  REMOVE_FOLDER_FOR_EDIT_NOTE,
  ADD_NOTES_PRE_EXISTING_TAGS,
  ADD_NOTES_PRE_EXISTING_FOLDERS,
  TOGGLE_RENDER_TAG_INPUT,
  TOGGLE_RENDER_FOLDER_INPUT
} from '../actions/editNote.actions';

const initialState = {
  titleValue: '',
  contentValue: '',
  tagValue: '',
  folderValue: '',
  tags: [],
  folders: [],
  renderTagInput: false,
  renderFolderInput: false,
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
    case TOGGLE_RENDER_TAG_INPUT:
      return {
        ...state,
        renderTagInput: !state.renderTagInput
      }
    case TOGGLE_RENDER_FOLDER_INPUT:
      return {
        ...state,
        renderFolderInput: !state.renderFolderInput
      }
    default:
      return state;
  }
}

