import {
  UPDATE_SEARCH_TERM,
  // UPDATE_SEARCH_TERM_SUCCESS
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
        ...state,
        query: {
          searchTerm: action.searchTerm
        }
      }
    default:
      return state;
  }
}

