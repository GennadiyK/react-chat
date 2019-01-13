import * as types from '../constants';
import history from '../utils/history';

// eslint-disable-next-line
export function redirect(to) {
  return (dispatch) => {
    history.push(`${to}`);
    dispatch({
      type: types.REDIRECT,
      payload: { to },
    });
  };
}
