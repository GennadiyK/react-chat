import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from "../Header";
import WelcomeContainer from "../WelcomeContainer";



const WelcomePage = ({}) => (
  <div>
    <Header/>
    <WelcomeContainer/>
  </div>
);


WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WelcomePage;