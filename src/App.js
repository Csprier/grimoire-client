import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, withRouter } from 'react-router-dom';

// User forms for landing page
import UserCreationForm from './components/Register';
import UserLoginForm from './components/Login';
import Dashboard from './components/Dashboard';
import AddNoteForm from './components/Notes/AddNoteForm';
import EditNoteForm from './components/Notes/EditNoteForm';
import LandingPage from './components/LandingPage';
import TagList from './components/Tags/TagList';
import FolderList from './components/Folders/FolderList';
import FolderNoteList from './components/Folders/FolderNoteList';
import FolderManager from './components/Folders/FolderManager';

import { refreshAuthToken } from './actions/auth.actions';

// History object
import history from './history';

// CSS
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
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
            <div className="component-container">
              <Route exact path ="/" component={LandingPage} />
              <Route exact path="/login" component={UserLoginForm} />
              <Route exact path="/register" component={UserCreationForm} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/addNote" component={AddNoteForm} />
              <Route exact path="/editNote" component={EditNoteForm} />
              <Route exact path="/tagList" component={TagList} />
              <Route exact path="/folderList" component={FolderList} />
              <Route exact path="/folder/:id" component={FolderNoteList} />
              <Route exact path="/folderManager" component={FolderManager} />
            </div>
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
