import {
  GET_FOLDERS_REQUEST,
  GET_FOLDERS_DATA,
  GET_FOLDERS_SUCCESS,
  GET_FOLDERS_ERROR
} from '../actions/folders.actions';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function foldersReducer(state = initialState, action) {
  switch(action.type) {
    // GET ================================================
    case GET_FOLDERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_FOLDERS_DATA:
      return {
        data: action.data,
        loading: false
      }
    case GET_FOLDERS_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case GET_FOLDERS_ERROR:
      return {
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}