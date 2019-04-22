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
      id: folder._id,
      name: folder.name,
      userId: folder.userId
    }));
    dispatch(getFoldersData(foldersData));
    dispatch(getFoldersSuccess());
  })
  .catch(e => {
    console.error(e);
    dispatch(getFoldersError(e));
  });
}