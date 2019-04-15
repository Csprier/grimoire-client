import {
  GET_TAGS_REQUEST,
  GET_TAGS_DATA,
  GET_TAGS_SUCCESS,
  GET_TAGS_ERROR
} from '../actions/tags.actions';

const initialState = {
  data: [],
  loading: false,
  error: null
}

export default function tagsReducer(state = initialState, action) {
  switch(action.type) {
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
    default:
      return state;
  }
}