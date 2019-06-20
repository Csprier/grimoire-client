import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// HOC
import RequiresLogin from './requires-login';

// Actions
import { logout } from '../actions/auth.actions';

// Components
import NoteList from './Notes/NoteList';
import NotesSearch from './Notes/NotesSearch';
import FolderList from './Folders/FolderList';

// logout image
// import LOImage from '../images/logout.png';

// css
import './css/dashboard.css';

class Dashboard extends Component {
  onClickLogout = () => {
    this.props.dispatch(logout());
    this.props.history.push('/');
  }

  moveToAddNote = () => {
    this.props.history.push('/addNote');
  }

  moveToTagList = () => {
    this.props.history.push('/tagList');
  }

  moveToFolderList = () => {
    this.props.history.push('/folderList');
  }

  render() {
    if (this.props.loading){
			return (<div className="loader">Loading...</div>);
    }
    
    return(
      <div className="dashboard-container">

        <header>
          <div className="header-elements">
            <button 
              className="pencil-icon"
              onClick={this.moveToAddNote}
            >&#9998;</button>
            <button
              className="tag-icon"
              onClick={this.moveToTagList}
            >&#9744;</button>
            <button
              onClick={this.onClickLogout}
              className="logout-button"
            >&#10097;</button>
          </div>
        </header>

        <div className="dashboard">
          <FolderList />
          {/* <div className="note-list-display">
            <NotesSearch />
            <NoteList />
          </div> */}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  loggedIn: state.auth.user !== null
});

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));