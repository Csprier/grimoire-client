import Axios from 'axios';
import { API_BASE_URL } from '../config';

// =======================================================
// GET TAGS ACTIONS
// =======================================================
export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST',
  getTagsRequest = () => {
    return {
      type: GET_TAGS_REQUEST
    }
  }

export const GET_TAGS_DATA = 'GET_TAGS_DATA',
  getTagsData = (data) => {
    return {
      type: GET_TAGS_DATA,
      data
    }
  }

export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS',
  getTagsSuccess = () => {
    return {
      type: GET_TAGS_SUCCESS,
    }
  }

export const GET_TAGS_ERROR = 'GET_TAGS_ERROR',
  getTagsError = (error) => {
    return {
      type: GET_TAGS_ERROR,
      error
    }
  }

export const getTags = () => (dispatch, getState) => {
  dispatch(getTagsRequest());
  const authToken = getState().auth.authToken;
  let url = `${API_BASE_URL}/tags`;

  return Axios.get(url, {
    headers: {
      'Authorization': 'bearer ' + authToken
    }
  })
  .then((res) => {
    const tagsData = res.data.map(tag => ({
      name: tag.name
    }));
    dispatch(getTagsData(tagsData));
    dispatch(getTagsSuccess());
  })
  .catch(e => {
    console.error(e);
    dispatch(getTagsError(e));
  });
}