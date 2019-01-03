import React from 'react';
import { Provider } from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import configureStore from './store'
import ChatPage from './containers/ChatPage'
import WelcomePage from "./containers/WelcomePage";
import PrivateRoute from './containers/PrivateRoute';
import history from './utils/history'

const store = configureStore();

const App = () => {
  return(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <PrivateRoute path="/chat/:chatId?" component={ChatPage}/>
          <Redirect to="/"/>
        </Switch>
      </Router>
    </Provider>
  )
};

export default App;
