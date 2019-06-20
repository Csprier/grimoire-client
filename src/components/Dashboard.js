import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// HOC
import RequiresLogin from './requires-login';

// Components
// import NoteList from './Notes/NoteList';
// import NotesSearch from './Notes/NotesSearch';
import FolderList from './Folders/FolderList';
import NavigationBar from './NavigationBar';

// css
import './css/dashboard.css';

class Dashboard extends Component {
  render() {
    if (this.props.loading){
			return (<div className="loader">Loading...</div>);
    }
    
    return(
      <div className="dashboard-container">
        <header>
          <NavigationBar />
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