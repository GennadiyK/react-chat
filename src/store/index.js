import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';

const composeEnhancers = composeWithDevTools({
  serialize: true,
});

export default function configureStore() {
  const store = createStore(
    reducer,
    /* preloadedState, */ composeEnhancers(
      applyMiddleware(thunkMiddleware),
      // other store enhancers if any
    ),
  );

  return store;
}
