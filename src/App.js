import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import configureStore from './store'
import ChatPage from './components/pages/ChatPage'
import WelcomePage from "./containers/WelcomePage";

const store = configureStore();

const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <Route path="/chat" component={ChatPage}/>
          <Redirect to="/"/>
        </Switch>
      </Router>
    </Provider>
  )
};

export default App;
