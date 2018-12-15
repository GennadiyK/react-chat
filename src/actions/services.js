import * as types from '../constants'
import history from '../utils/history';

export function redirect(to) {
  return (dispatch) => {
    console.log('TO', to)
    history.push(`${to}`);
    dispatch({
      type: types.REDIRECT,
      payload: {to}
    })
  }
}