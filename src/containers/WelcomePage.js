import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WelcomePage from '../components/WelcomePage';
import {signup, login} from '../actions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signup,
    login
  },
  dispatch
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);