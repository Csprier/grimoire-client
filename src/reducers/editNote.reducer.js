import {
  ADD_TAG_FOR_EDIT_NOTE,
  ADD_FOLDER_FOR_EDIT_NOTE,
  REMOVE_TAG_FOR_EDIT_NOTE,
  REMOVE_FOLDER_FOR_EDIT_NOTE,
  ADD_NOTES_PRE_EXISTING_TAGS,
  ADD_NOTES_PRE_EXISTING_FOLDERS,
  TOGGLE_RENDER_TAG_INPUT,
  TOGGLE_RENDER_FOLDER_INPUT,
  EDIT_NEW_TITLE_VALUE,
  EDIT_NEW_CONTENT_VALUE,
  EDIT_NEW_TAG_VALUE,
  EDIT_NEW_FOLDER_VALUE
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
    // LOAD TAGS AND FOLDERS THAT NOTE ALREADY HAS
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
    // TOGGLE RENDERING INPUTS
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
    // EDITED VALUES
    case EDIT_NEW_TITLE_VALUE:
      return {
        ...state,
        titleValue: action.value
      }
    case EDIT_NEW_CONTENT_VALUE:
      return {
        ...state,
        contentValue: action.value
      }
    case EDIT_NEW_TAG_VALUE:
      return {
        ...state,
        tagValue: action.value
      }
    case EDIT_NEW_FOLDER_VALUE:
      return {
        ...state,
        folderValue: action.value
      }
    default:
      return state;
  }
}

