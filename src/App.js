import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, withRouter } from 'react-router-dom';

// User forms for landing page
import UserCreationForm from './components/Register';
import UserLoginForm from './components/Login';

import { refreshAuthToken } from './actions/auth.actions';

// History object
import history from './history';

// CSS
import './App.css';

class App extends Component {
  // trigger each time a prop value is changed
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } 
    else if (prevProps.loggedIn && !this.props.loggedIn) {
      // stop refreshing when we log out
      this.startPeriodicRefresh();
    }
  }

  // Perform any clean up before the component is 'destroyed'
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()), 
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <main>
            <Route exact path="/" component={UserLoginForm} />
            <Route exact path="/register" component={UserCreationForm} />
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.user !== null
})

export default withRouter(connect(mapStateToProps)(App));
