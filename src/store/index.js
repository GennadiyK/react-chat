import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  )
}