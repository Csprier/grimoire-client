import {
  GET_NOTES_REQUEST,
  GET_NOTES_DATA,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  FILTER_NOTES,
  FILTER_NOTES_SUCCESS,
  ADD_NOTE_REQUEST,
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_ERROR
} from '../actions/notes.actions';

const initialState = {
  data: [],
  loading: false,
  filtered: [],
  error: null
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
        // ...state,
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
    case ADD_NOTE_REQUEST:
      return {
        loading: true
      }
    case ADD_NOTE:
      return {
        data: state.notes.data.push(action.note),
        loading: true
      }
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ADD_NOTE_ERROR:
      return {
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}