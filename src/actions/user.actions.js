import { API_BASE_URL } from '../config';
import { login, loginError } from './auth.actions';
import { normalizeResponseErrors } from './utils';

export const createUser = (username, email, password) => dispatch => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(() => dispatch(login(username, password)))
  .catch(error => {
    const { message } = error;
    dispatch(loginError(message));
  });
};
