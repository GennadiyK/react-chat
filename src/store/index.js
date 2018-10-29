import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
  serialize: true
});

export default function configureStore() {
  const store =  createStore(
    reducer,
    process.env.NODE_ENV === 'production' ?
      applyMiddleware(thunkMiddleware) :
      composeEnhancers(applyMiddleware(thunkMiddleware)),
  );

  if(module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(reducer);
    })
  }

  return store;
}


