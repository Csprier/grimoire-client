import Axios from 'axios';
import { API_BASE_URL } from '../config';

// =======================================================
// GET FOLDERS ACTIONS
// =======================================================
export const GET_FOLDERS_REQUEST = 'GET_FOLDERS_REQUEST',
  getFoldersRequest = () => {
    return {
      type: GET_FOLDERS_REQUEST
    }
  }

export const GET_FOLDERS_DATA = 'GET_FOLDERS_DATA',
  getFoldersData = (data) => {
    return {
      type: GET_FOLDERS_DATA,
      data
    }
  }

export const GET_FOLDERS_SUCCESS = 'GET_FOLDERS_SUCCESS',
  getFoldersSuccess = () => {
    return {
      type: GET_FOLDERS_SUCCESS
    }
  }

export const GET_FOLDERS_ERROR = 'GET_FOLDERS_ERROR',
  getFoldersError = (error) => {
    return {
      type: GET_FOLDERS_ERROR,
      error
    }
  }

export const getFolders = () => (dispatch, getState) => {
  dispatch(getFoldersRequest());
  const authToken = getState().auth.authToken;
  let url = `${API_BASE_URL}/folders`;

  return Axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'bearer ' + authToken
    }
  })
  .then((res) => {
    const foldersData = res.data.map(folder => ({
      _id: folder._id,
      name: folder.name,
    }));
    dispatch(getFoldersData(foldersData));
    dispatch(getFoldersSuccess());
  })
  .catch(e => {
    console.error(e);
    dispatch(getFoldersError(e));
  });
}

// =======================================================
// FOLDER ID FOR VIEWING THE NOTES IN A SPECIFIC FOLDER
// =======================================================
export const FOLDER_ID_TO_VIEW = 'FOLDER_ID_TO_VIEW',
  folderIdToView = (id) => {
    return {
      type: FOLDER_ID_TO_VIEW,
      id
    }
  }

export const CLEAR_FOLDER_ID_TO_VIEW = 'CLEAR_FOLDER_ID_TO_VIEW',
  clearFolderIdToView = () => {
    return {
      type: CLEAR_FOLDER_ID_TO_VIEW
    }
  }
// =======================================================
// ADD FOLDER ACTIONS
// =======================================================
export const TOGGLE_ADD_FOLDER_INPUT_RENDER = 'TOGGLE_ADD_FOLDER_INPUT_RENDER',
  toggleAddFolderInputRender = () => {
    return {
      type: TOGGLE_ADD_FOLDER_INPUT_RENDER
    }
  }

export const ADD_FOLDER_REQUEST = 'ADD_FOLDER_REQUEST',
  addFolderRequest = () => {
    return {
      type: ADD_FOLDER_REQUEST
    }
  }

export const ADD_FOLDER = 'ADD_FOLDER',
  addFolder = (folder) => {
    return {
      type: ADD_FOLDER,
      folder
    }
  }

export const ADD_FOLDER_SUCCESS = 'ADD_FOLDER_SUCCESS',
  addFolderSuccess = (res) => {
    console.log('addFolderSuccess', res);
    return {
      type: ADD_FOLDER_SUCCESS,
      newFolders: res.data
    }
  }

export const ADD_FOLDER_ERROR = 'ADD_FOLDER_ERROR',
  addFolderError = (error) => {
    return {
      type: ADD_FOLDER_ERROR,
      error
    }
  }

  export const addNewFolder = (folderArray) => (dispatch, getState) => {
    dispatch(addFolderRequest());
    const authToken = getState().auth.authToken,
          url = `${API_BASE_URL}/folders`,
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'bearer ' + authToken
            }
          };
  
    return Axios.all([
      Axios.post(url, folderArray, options)
    ])
    .then(res => {
      let newFolders = res[0].data;
      newFolders.forEach(folder => addFolderSuccess(folder));
      dispatch(getFolders());
    })
    .catch(e => {
      console.error(e);
      dispatch(addFolderError(e));
    });
  }
  
  // =======================================================
// DELETE FOLDER ACTIONS
// =======================================================
export const DELETE_FOLDER_REQUEST = 'DELETE_FOLDER_REQUEST',
  deleteFolderRequest = () => {
    return {
      type: DELETE_FOLDER_REQUEST
    }
  }

export const DELETE_FOLDER = 'DELETE_FOLDER',
  deleteFolder = (folder) => {
    return {
      type: DELETE_FOLDER,
      folder
    }
  }

export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS',
  deleteFolderSuccess = () => {
    return {
      type: DELETE_FOLDER_SUCCESS
    }
  }

export const DELETE_FOLDER_ERROR = 'DELETE_FOLDER_ERROR',
  deleteFolderError = (error) => {
    return {
      type: DELETE_FOLDER_ERROR,
      error
    }
  }

export const deleteFolderFromDatabase = (userId, folderId) => (dispatch, getState) => {
  dispatch(deleteFolderRequest());
  const authToken = getState().auth.authToken,
        url = `${API_BASE_URL}/folders/${folderId}`,
        folder = { userId, id: folderId };

  return Axios.delete(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'bearer ' + authToken
    }
  })
  .then(res => {
    dispatch(deleteFolder(folder));
    dispatch(deleteFolderSuccess());
    dispatch(getFolders());
  })
  .catch(e => {
    console.error(e);
    dispatch(deleteFolderError(e));
  });
}