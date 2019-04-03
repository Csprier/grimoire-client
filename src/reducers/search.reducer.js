import {
  UPDATE_SEARCH_TERM,
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
          searchTerm: action.term  
        }
      }
    default:
      return state;
  }
}

