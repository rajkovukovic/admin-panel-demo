import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// material-ui
import { Checkbox, TextField } from 'redux-form-material-ui';
// import RaisedButton from 'material-ui/RaisedButton';
import Button from '../ui/Button';

import formValidate from '../../helpers/formValidation';
import * as AuthActions from '../../store/actionCreators/authActionCreator';
import { AuthType } from '../../store/constants/authActionNames';
import { DefaultRoutes } from '../../constants/routes';
import { goTo } from '../../store/history';

class SiginView extends React.Component {
  static propTypes = {
    authInProgress: PropTypes.bool,
    authError:      PropTypes.string,
    signIn:         PropTypes.func.isRequired,
    handleSubmit:   PropTypes.func.isRequired,
  }

  static defaultProps = {
    authInProgress: false,
    authError:      null,
  }

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // componentWillMount() {
  // }

  handleFormSubmit(formProps) {
    const { signIn } = this.props;
    // console.log({
    //   ...formProps,
    //   login: formProps.username,
    // });
    signIn({
      ...formProps,
      login:    formProps.username,
      callback: (success) => {
        if (success) {
          goTo(DefaultRoutes.auth);
        }
        else {
          goTo(DefaultRoutes.unauth);
        }
      },
    });
  }

  render() {
    const { authInProgress, authError, handleSubmit } = this.props;
    // const process = this.props.process.login;
    return (
      <form
        className="SiginView"
        style={{
          paddingTop:    80,
          paddingBottom: 80,
        }}
        ref={(form) => {
          this.refForm = form;
        }}
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <h1
          className="SiginViewHeading"
        >
          Sign In
        </h1>
        <fieldset
          className="SiginViewFieldset"
          disabled={authInProgress}
        >
          <Field
            component={TextField}
            name="username"
            type="text"
            floatingLabelText="Username or Email"
            fullWidth
            disabled={authInProgress}
          />
          <Field
            component={TextField}
            name="password"
            type="password"
            floatingLabelText="Password"
            fullWidth
            disabled={authInProgress}
          />
          <Button
            className="SiginViewSubmitButton"
            isLoading={authInProgress}
            label="Get Started"
            error={authError}
            primary
            fullWidth
            disabled={authInProgress}
            type="submit"
            value="Post"
          />
          <Field
            component={Checkbox}
            name="keepMeSignIn"
            label="Keep me signed in"
            disabled={authInProgress}
            labelStyle={{
              fontSize: 16,
            }}
            style={{
              marginTop: 16,
            }}
          />
        </fieldset>
      </form>
    );
  }
}


const initialValues = {
  username:     '',
  password:     '',
  keepMeSignIn: false,
};


const fields = ['username', 'password', 'keepMeSignIn'];
const validate = valuesToValidate => formValidate(valuesToValidate, fields.slice(0, -1));

function mapStateToProps(state) {
  const result = {
    initialValues,
    authInProgress: state.auth.authState !== AuthType.UNAUTH,
    authError:      state.auth.error,
  };
  return result;
}

function mapDispatchToProps(dispatch) {
  return ({
    signIn: payload => dispatch(AuthActions.signIn(payload)),
  });
}

// Creates a decorator with which we use redux-form to connect our form component to Redux.
const SiginViewRedux = reduxForm({
  form: 'login',
  validate,
}, mapStateToProps, null)(SiginView);

// Makes Redux store available to our commponent
export default connect(mapStateToProps, mapDispatchToProps)(SiginViewRedux);
