import * as types from '../constants'
import history from '../utils/history';

export function redirect(to) {
  return (dispatch) => {
    console.log('TO', to)
    history.push(`${process.env.PUBLIC_URL}/${to}`);
    dispatch({
      type: types.REDIRECT,
      payload: {to}
    })
  }
}