import {
  GET_TAGS_REQUEST,
  GET_TAGS_DATA,
  GET_TAGS_SUCCESS,
  GET_TAGS_ERROR,
  ADD_TAG_REQUEST,
  TOGGLE_ADD_TAG_INPUT_RENDER,
  ADD_TAG,
  ADD_TAG_SUCCESS,
  ADD_TAG_ERROR,
  DELETE_TAG_REQUEST,
  DELETE_TAG,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_ERROR
} from '../actions/tags.actions';

const initialState = {
  data: [],
  loading: false,
  renderAddTagInput: false,
  error: null
};

export default function tagsReducer(state = initialState, action) {
  switch(action.type) {
    // GET ================================================
    case GET_TAGS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_TAGS_DATA:
      return {
        data: action.data,
        loading: false
      }
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case GET_TAGS_ERROR:
      return {
        error: action.error,
        loading: false
      }
    // POST ================================================
    case TOGGLE_ADD_TAG_INPUT_RENDER:
      return {
        ...state,
        renderAddTagInput: !state.renderAddTagInput
      }
    case ADD_TAG_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_TAG:
      return {
        tags: {
          data: state.data.push(action.tag)
        },
        loading: true
      }
    case ADD_TAG_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ADD_TAG_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    // DELETE ================================================
    case DELETE_TAG_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_TAG:
      return {
        ...state,
        loading: true
      }
    case DELETE_TAG_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_TAG_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}