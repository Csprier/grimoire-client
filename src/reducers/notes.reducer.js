import {
  GET_NOTES_REQUEST,
  GET_NOTES_DATA,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  FILTER_NOTES,
  FILTER_NOTES_SUCCESS
} from '../actions/notes.actions';

const initialState = {
  data: [],
  loading: false,
  filtered: []
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
    case FILTER_NOTES:
      return {
        ...state,
        filtered: action.filteredNotes,
        loading: true
      }
    case FILTER_NOTES_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}