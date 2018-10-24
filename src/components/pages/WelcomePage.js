import React from 'react'
import Header from "../Header";
import WelcomeContainer from "../WelcomeContainer";

class WelcomePage extends React.Component {
  render() {
    const { signup, login } = this.props;
    return (
      <div>
        <Header/>
        <WelcomeContainer signup={signup} login={login}/>
      </div>
    )
  }
}

export default WelcomePage;