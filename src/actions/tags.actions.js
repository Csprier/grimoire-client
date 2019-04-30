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
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'bearer ' + authToken
    }
  })
  .then((res) => {
    const tagsData = res.data.map(tag => ({
      name: tag.name,
      id: tag._id
    }));
    dispatch(getTagsData(tagsData));
    dispatch(getTagsSuccess());
  })
  .catch(e => {
    console.error(e);
    dispatch(getTagsError(e));
  });
}


// =======================================================
// ADD TAG ACTIONS
// =======================================================
export const ADD_TAG_REQUEST = 'ADD_TAG_REQUEST',
  addTagRequest = () => {
    return {
      type: ADD_TAG_REQUEST
    }
  }

export const ADD_TAG = 'ADD_TAG',
  addTag = (tag) => {
    return {
      type: ADD_TAG,
      tag
    }
  }

export const ADD_TAG_SUCCESS = 'ADD_TAG_SUCCESS',
  addTagSuccess = (res) => {
    console.log('addTagSuccess', res);
    return {
      type: ADD_TAG_SUCCESS,
      newTags: res.data
    }
  }

export const ADD_TAG_ERROR = 'ADD_TAG_ERROR',
  addTagError = (error) => {
    return {
      type: ADD_TAG_ERROR,
      error
    }
  }

export const addNewTag = (userId, tagArray) => (dispatch, getState) => {
  console.log('tags.action addNewTag', tagArray);
  dispatch(addTagRequest());
  const authToken = getState().auth.authToken,
        url = `${API_BASE_URL}/tags`,
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'bearer ' + authToken
          }
        };

  let newTag = {
    userId,
    tags: tagArray
  }

  return Axios.post(url, newTag, options)
    .then(res => {
      let tag = { 
        name: res.data.tagName, 
        _id: res.data._id 
      }
      dispatch(addTag(tag));
      dispatch(getTags());
      return dispatch(addTagSuccess(res)); // return this dispatch to get a .then() available when it is dispatched in another file
    })
    .catch(e => {
      console.error(e);
      dispatch(addTagError(e));
    });
}

// =======================================================
// DELETE TAG ACTIONS
// =======================================================
export const DELETE_TAG_REQUEST = 'DELETE_TAG_REQUEST',
  deleteTagRequest = () => {
    return {
      type: DELETE_TAG_REQUEST
    }
  }

export const DELETE_TAG = 'DELETE_TAG',
  deleteTag = (tag) => {
    return {
      type: DELETE_TAG,
      tag
    }
  }

export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS',
  deleteTagSuccess = () => {
    return {
      type: DELETE_TAG_SUCCESS
    }
  }

export const DELETE_TAG_ERROR = 'DELETE_TAG_ERROR',
  deleteTagError = (error) => {
    return {
      type: DELETE_TAG_ERROR,
      error
    }
  }

  export const deleteTagFromDatabase = (userId, tagId) => (dispatch, getState) => {
    dispatch(deleteTagRequest());
    const authToken = getState().auth.authToken,
          url = `${API_BASE_URL}/tags/${tagId}`,
          tag = { userId, id: tagId }

    return Axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'bearer ' + authToken
      }
    })
    .then(res => {
      dispatch(deleteTag(tag));
      dispatch(deleteTagSuccess());
      dispatch(getTags());
    })
    .catch(e => {
      console.error(e);
      dispatch(deleteTagError(e));
    });
  }
  