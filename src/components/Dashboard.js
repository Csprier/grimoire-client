import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from './requires-login';

// Components
import NoteList from './Notes/NoteList';

class Dashboard extends Component {
  render() {
    if (this.props.loading){
			return (<div className="loader">Loading...</div>);
    }
    
    return(
      <div className="dashboard-container">
        <div className="dashboard">
          <h1>Dashboard</h1>
          <NoteList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));