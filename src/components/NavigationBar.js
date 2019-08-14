import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { logout } from '../actions/auth.actions';
import { showModal } from '../actions/modal.actions';

// CSS
import './css/navigation-bar.css';

class NavigationBar extends Component {
  onClickLogout = () => {
    this.props.dispatch(logout());
    this.props.history.push('/');
  }

  moveToTagList = () => {
    this.props.history.push('/tagList');
  }

  moveToFolderManager = () => {
    this.props.history.push('/folderManager');
  }

  openAddNoteFormModal = () => {
    this.props.dispatch(showModal());
  }

  render() {
    return (
      <div className="header-elements">
        <button 
          title="Create a note"
          className="pencil-icon icon"
          onClick={(e) => this.openAddNoteFormModal(e)}
        >&#9998;</button>
        <button
          title="Go to Tags"
          className="tag-icon icon"
          onClick={this.moveToTagList}
        >&#9744;</button>
        <button
          title="Go to Folders"
          className="folder-icon icon"
          onClick={this.moveToFolderManager}
        >&#10063;</button>
        <button
          title="Logout"
          onClick={this.onClickLogout}
          className="logout-button icon"
        >Logout</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.notes.editMode,
  noteToEdit: state.notes.noteToEdit,
  show: state.modal.show
});

export default withRouter(connect(mapStateToProps)(NavigationBar));