import {
  UPDATE_SEARCH_TERM,
  UPDATE_SEARCH_TERM_SUCCESS, 
  RESET_SEARCH_TERM,
  RESET_SEARCH_TERM_SUCCESS
} from '../actions/search.actions';

const initialState = {
  query: {
    searchTerm: ''
  }
}

export default function searchReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        query: {
          searchTerm: action.term  
        },
        loading: true
      }
    case UPDATE_SEARCH_TERM_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case RESET_SEARCH_TERM:
      return {
        query: {
          searchTerm: ''
        },
        loading: true
      }
    case RESET_SEARCH_TERM_SUCCESS:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}

