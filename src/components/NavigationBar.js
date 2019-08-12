import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Modal from '../components/Modal';
import AddNoteForm from '../components/Notes/AddNoteForm';
import EditNoteForm from '../components/Notes/EditNoteForm';

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
          className="pencil-icon"
          onClick={(e) => this.openAddNoteFormModal(e)}
        >&#9998;</button>
        <button
          title="Go to Tags"
          className="tag-icon"
          onClick={this.moveToTagList}
        >&#9744;</button>
        <button
          title="Go to Folders"
          className="folder-icon"
          onClick={this.moveToFolderManager}
        >&#10063;</button>
        <button
          title="Logout"
          onClick={this.onClickLogout}
          className="logout-button"
        >Logout</button>

        {(this.props.show && !this.props.editMode && this.props.noteToEdit === '') 
          ? <Modal onClose={this.openAddNoteFormModal}>
              <AddNoteForm />
            </Modal>
          : null}

        {(this.props.editMode && this.props.noteToEdit !== '') 
          ? <Modal onClose={this.openEditNoteModal}>
              <EditNoteForm noteToEdit={this.props.noteToEdit} />
            </Modal>
          : null}
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