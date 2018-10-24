import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore() {
  return createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
    )
}