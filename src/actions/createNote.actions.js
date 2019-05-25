export const ADD_TAG_TO_NEW_NOTE = 'ADD_TAG_TO_NEW_NOTE',
  addTagToNewNote = (tag) => {
    return {
      type: ADD_TAG_TO_NEW_NOTE,
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
