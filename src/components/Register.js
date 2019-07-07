import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

// Validators
import { validators } from './validators';
import renderField from './Field/renderField';

// ACTIONS
import { createUser } from '../actions/user.actions';
import { loginError } from '../actions/auth.actions';

// CSS
import './css/register.css';

// Password validation
const passwordLength = validators.length({ min: 8, max: 72 });
const validPassword = validators.passwordsMatch('password');

class UserCreationForm extends Component {
  moveToDashboard() {
    this.props.history.push('/dashboard')
  }
  
  handleRegisterSubmit(values) {
    this.props.dispatch(createUser(values.username, values.email, values.password))
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
      <div className="user-creation-form-container">
        <div className="user-creation-form">
            {/* <h2>Create an Account</h2> */}
            <form onSubmit={this.props.handleSubmit(values =>
              this.handleRegisterSubmit(values)
            )} className="register-form">
              <Field 
                aria-label="createusername"
                label="Username"
                name="username" 
                id="username" 
                type="text" 
                containerClassName="register-input-container"
                className="register-input"
                component={renderField}
                validate={[ 
                  validators.required, 
                  validators.nonEmpty, 
                  validators.isTrimmed
                 ]}
                autoComplete="off"
                placeholder="Username..."
                />
              <Field 
                aria-label="createemail"
                label="Email"
                name="email" 
                id="email" 
                type="text" 
                containerClassName="register-input-container"
                className="register-input"
                component={renderField}
                validate={[ 
                  validators.required, 
                  validators.nonEmpty, 
                  validators.validEmail, 
                  validators.isTrimmed,
                ]}
                autoComplete="off"
                placeholder="Email..."
                />
              <Field 
                aria-label="createpassword"
                label="Password"
                name="password" 
                id="password" 
                type="password" 
                containerClassName="register-input-container"
                className="register-input"
                component={renderField} 
                validate={[ 
                  validators.required, 
                  validators.nonEmpty, 
                  validators.isTrimmed,
                  passwordLength 
                ]}
                autoComplete="off"
                placeholder="Password..."
              />
              <Field 
                aria-label="confirmpassword"
                label="Confirm Password"
                name="confirmpassword" 
                id="confirmpassword" 
                type="password" 
                containerClassName="register-input-container"
                className="register-input"
                component={renderField} 
                validate={[ 
                  validators.required, 
                  validators.nonEmpty,
                  validators.isTrimmed,
                  validPassword
                 ]}
                autoComplete="off"
                placeholder="Confirm Password..."
              />
              <div className="register-buttons">
                <button 
                  className="creation-button" 
                  name="submit-create-account" 
                  type="submit"
                >CREATE ACCOUNT</button>
                <Link to="/" className="go-back">Go back</Link>
              </div>
              {error}
            </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null,
  loginFail: (state.auth.error !== null) ? state.auth.error : undefined
});

UserCreationForm = reduxForm({
  form: 'userCreationForm', // save form name
  // destroyOnUnmount: false, // preserve form data
  forceUnregisterOnUnmount: true, // unregister fields on unmount
  onSubmitFail: (submitError, dispatch) => {
    dispatch(loginError(submitError))
  }
})(UserCreationForm);

export default connect(mapStateToProps)(UserCreationForm);