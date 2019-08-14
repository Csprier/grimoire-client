export const ADD_TAG_TO_NEW_NOTE = 'ADD_TAG_TO_NEW_NOTE',
  addTagToNewNote = (tag) => {
    return {
      type: ADD_TAG_TO_NEW_NOTE,
      tag
    }
  }
export const REMOVE_TAG_FROM_NEW_NOTE = 'REMOVE_TAG_FROM_NEW_NOTE',
  removeTagFromNewNote = (tag) => {
    return {
      type: REMOVE_TAG_FROM_NEW_NOTE,
      tag
    }
  }

export const ADD_FOLDER_TO_NEW_NOTE = 'ADD_FOLDER_TO_NEW_NOTE',
  addFolderToNewNote = (folder) => {
    return {
      type: ADD_FOLDER_TO_NEW_NOTE,
      folder
    }
  }
  export const REMOVE_FOLDER_FROM_NEW_NOTE = 'REMOVE_FOLDER_FROM_NEW_NOTE',
  removeFolderFromNewNote = (folder) => {
    return {
      type: REMOVE_FOLDER_FROM_NEW_NOTE,
      folder
    }
  }


export const CLEAR_REDUX_TAG_CHIPS = 'CLEAR_REDUX_TAG_CHIPS',
  clearReduxTagChips = () => {
    return {
      type: CLEAR_REDUX_TAG_CHIPS
    }
  }

export const CLEAR_REDUX_FOLDER_CHIPS = 'CLEAR_REDUX_FOLDER_CHIPS',
  clearReduxFolderChips = () => {
    return {
      type: CLEAR_REDUX_FOLDER_CHIPS
    }
  }
