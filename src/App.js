import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import ChatPage from './components/pages/ChatPage'
import WelcomePage from "./components/pages/WelcomePage";

const App = () => {
  return(
      <Router>
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <Route path="/chat" component={ChatPage}/>
          <Redirect to="/"/>
        </Switch>
      </Router>
  )
};

export default App;
