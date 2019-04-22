import {
  GET_FOLDERS_REQUEST,
  GET_FOLDERS_DATA,
  GET_FOLDERS_SUCCESS,
  GET_FOLDERS_ERROR,
  ADD_FOLDER_REQUEST,
  ADD_FOLDER,
  ADD_FOLDER_SUCCESS,
  ADD_FOLDER_ERROR,
  DELETE_FOLDER_REQUEST,
  DELETE_FOLDER,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_ERROR

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
    // POST ================================================
    case ADD_FOLDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_FOLDER:
      return {
        folders: {
          data: state.data.push(action.tag)
        }
      }
    case ADD_FOLDER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ADD_FOLDER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    // DELETE ================================================
    case DELETE_FOLDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_FOLDER:
      return {
        ...state,
        loading: true
      }
    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_FOLDER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}