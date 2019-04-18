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
  ADD_NOTE_ERROR,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  REMOVE_TAG_FROM_NOTE_REQUEST,
  REMOVE_TAG_FROM_NOTE_SUCCESS,
  REMOVE_TAG_FROM_NOTE_ERROR
} from '../actions/notes.actions';

const initialState = {
  data: [],
  loading: false,
  filtered: [],
  error: null
}

export default function notesReducer(state = initialState, action) {
  switch(action.type) {
    // GET =================================================
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
        error: action.error,
        loading: false
      }
    // FILTER =================================================
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
    // POST =================================================
    case ADD_NOTE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_NOTE:
      return {
        notes: {
          data: state.data.push(action.note),
        },
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
    // DELETE =================================================
    case DELETE_NOTE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case DELETE_NOTE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    // DELETE =================================================
    case REMOVE_TAG_FROM_NOTE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case REMOVE_TAG_FROM_NOTE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case REMOVE_TAG_FROM_NOTE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}