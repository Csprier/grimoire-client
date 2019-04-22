import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions

// Compontents

// CSS

class FolderList extends Component {
  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="folder-list-container">
        <h4>Your folders</h4>
        <button onClick={this.returnToDashboard}>&#60;  Dashboard</button>
      </div>
    )
  }
}

export default RequiresLogin()(connect()(FolderList));