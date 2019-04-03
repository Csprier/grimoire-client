import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// HOC
import RequiresLogin from './requires-login';

// Actions
import { logout } from '../actions/auth.actions';

// Components
import NoteList from './Notes/NoteList';

class Dashboard extends Component {
  onClickLogout = () => {
    this.props.dispatch(logout());
    this.props.history.push('/');
  }

  render() {
    if (this.props.loading){
			return (<div className="loader">Loading...</div>);
    }
    
    return(
      <div className="dashboard-container">
        <header>
          <h1>Dashboard</h1>
          <Link to="/" onClick={this.onClickLogout}>LogOut</Link>
        </header>
        <div className="dashboard">
          <NoteList />
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