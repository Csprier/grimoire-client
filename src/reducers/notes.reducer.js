import {
  GET_NOTES_REQUEST,
  GET_NOTES_DATA,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR
} from '../actions/notes.actions';

const initialState = {
  data: [],
  loading: false
}

export default function notesReducer(state = initialState, action) {
  switch(action.type) {
    case GET_NOTES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_NOTES_DATA:
      return {
        data: action.data,
        loading: false
      }
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case GET_NOTES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}