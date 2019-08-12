import {
  SHOW_MODAL
} from '../actions/modal.actions';

const initialState = {
  show: false,
  error: null
};

export default function modalReducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: !state.show
      }
    default:
      return state;
  }
}