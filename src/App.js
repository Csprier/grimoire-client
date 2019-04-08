import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, withRouter } from 'react-router-dom';

// User forms for landing page
import UserCreationForm from './components/Register';
import UserLoginForm from './components/Login';
import Dashboard from './components/Dashboard';
import AddNote from './components/Notes/AddNote';
import LandingPage from './components/LandingPage';

import { refreshAuthToken } from './actions/auth.actions';

// History object
import history from './history';

// CSS
import './App.css';

class App extends Component {
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
            <Route exact path ="/" component={LandingPage} />
            <Route exact path="/" component={UserLoginForm} />
            <Route exact path="/register" component={UserCreationForm} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addNote" component={AddNote} />
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
