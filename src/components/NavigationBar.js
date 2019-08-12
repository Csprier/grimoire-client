import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Modal from '../components/modal';
import AddNoteForm from '../components/Notes/AddNoteForm';

// Actions
import { logout } from '../actions/auth.actions';

// CSS
import './css/navigation-bar.css';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  onClickLogout = () => {
    this.props.dispatch(logout());
    this.props.history.push('/');
  }

  // moveToAddNote = () => {
  //   this.props.history.push('/addNote');
  // }

  moveToTagList = () => {
    this.props.history.push('/tagList');
  }

  moveToFolderManager = () => {
    this.props.history.push('/folderManager');
  }

  openModalForm = (e) => {
    e.preventDefault();
    console.log('Toggle ZE MODAL!!! Mwahahah!');
    this.props.showModal(e);
  }

  render() {
    return (
      <div className="header-elements">
        <button 
          title="Create a note"
          className="pencil-icon"
          // onClick={this.moveToAddNote}
          onClick={(e) => this.openModalForm(e)}
        >&#9998;</button>
        <Modal onClose={this.showModal} show={this.props.show}>
          This is the modal test
        </Modal>
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
      </div>
    );
  }
}

export default withRouter(connect()(NavigationBar));