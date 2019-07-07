import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { logout } from '../actions/auth.actions';

// CSS
import './css/navigation-bar.css';

class NavigationBar extends Component {
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

  moveToFolderManager = () => {
    this.props.history.push('/folderManager');
  }


  render() {
    return (
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
          className="folder-icon"
          onClick={this.moveToFolderManager}
        >&#10063;</button>
        <button
          onClick={this.onClickLogout}
          className="logout-button"
        >&#10097;</button>
      </div>
    );
  }
}

export default withRouter(connect()(NavigationBar));