import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

// Validators
import { validators } from './validators';
import renderField from './Field/renderField';

// ACTIONS
import { login } from '../actions/auth.actions';

// CSS
import './css/login.css';

class UserLoginForm extends Component {
  moveToDashboard() {
    this.props.history.push('/dashboard')
  }
  
  handleLoginSubmit(values) {
    this.props.dispatch(login(values.username, values.password))
      .then(() => this.moveToDashboard());
  }

  render() {
    let error;
    if (this.props.loginFail) {
      error = (
        <div className="form-field-error" aria-live="polite">
          {this.props.loginFail}
        </div>
      );
    }

    return (
      <div className="user-login-form">
        <h2>Login</h2>
        <form onSubmit={this.props.handleSubmit(values =>
          this.handleLoginSubmit(values)
        )}>
          <label htmlFor="username">Username</label>
          <Field 
            aria-label="username"
            name="username"
            id="loginusername" 
            type="text" 
            component={renderField}
            validate={[ validators.required, validators.nonEmpty, validators.isTrimmed ]}
            placeholder="Username..."
            />
          <label htmlFor="password">Password</label>
          <Field 
            aria-label="password"
            name="password" 
            id="loginpassword" 
            type="password" 
            component={renderField}
            validate={[ validators.required, validators.nonEmpty ]}
            placeholder="Password..."
          />
          <div className="login-buttons">
            <Link to="/">Back</Link>
            <button className="login-button" name="submit-login" type="submit">LOG IN</button>
          </div>
          {error}
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  loginFail: state.auth.error
});
UserLoginForm = reduxForm({
  form: 'UserLoginForm',
  // onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(UserLoginForm);

export default connect(mapStateToProps)(UserLoginForm);