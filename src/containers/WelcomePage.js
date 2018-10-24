import connect from 'react-redux';
import { bindActionCreators } from 'redux';
import WelcomePage from '../components/pages/WelcomePage';
import {signup, login} from '../actions';

const matStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signup,
  login
});


export default connect(
  matStateToProps,
  mapDispatchToProps
)(WelcomePage)
