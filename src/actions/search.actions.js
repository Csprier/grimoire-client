import Axios from 'axios';
import { API_BASE_URL } from '../config';

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM',
  updateSearchTerm = term => {
    return {
      type: UPDATE_SEARCH_TERM,
      term
    }
  }

export const UPDATE_SEARCH_TERM_SUCCESS = 'UPDATE_SEARCH_TERM_SUCCESS',
  updateSearchTermSuccess = () => {
    return {
      type: UPDATE_SEARCH_TERM_SUCCESS
    }
  }

export const searchNotes = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  let searchTerm = getState().search.query.searchTerm;
  let url = `${API_BASE_URL}/notes`;

  return Axios.get(url, {
    headers: {
      'Authorization': "bearer " + authToken
    }
  })
  .then((res) => {
    let filteredNotes = res.data.filter(note => note.title.includes(searchTerm));
    console.log(filteredNotes);
  })
  .catch(e => {
    console.error(e);
  });
}