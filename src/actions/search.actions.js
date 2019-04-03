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