import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// HOC
import RequiresLogin from './requires-login';

// Components
import NoteList from './Notes/NoteList';
import NotesSearch from './Notes/NotesSearch';
import FolderList from './Folders/FolderList';
import NavigationBar from './NavigationBar';
import Modal from './modal';
import AddNoteForm from '../components/Notes/AddNoteForm';
import EditNoteForm from '../components/Notes/EditNoteForm';

// Actions
import { showModal } from '../actions/modal.actions';

// css
import './css/dashboard.css';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  openAddNoteFormModal = () => {
    this.props.dispatch(showModal());
  }

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
          <div className="modal-container">
            {(this.props.show && !this.props.editMode && this.props.noteToEdit === '') 
              ? <Modal 
                  onClose={this.openAddNoteFormModal}
                  modalHeader={'Add a note'}
                >
                  <AddNoteForm />
                </Modal>
              : null}
            {(this.props.editMode && this.props.noteToEdit !== '') 
              ? <Modal 
                  onClose={this.openEditNoteModal}
                  modalHeader={'Edit a note'}
                >
                  <EditNoteForm noteToEdit={this.props.noteToEdit} />
                </Modal>
              : null}
          </div>
          <div className="folder-list-display">
            <FolderList />
          </div>
          <div className="note-list-display">
            <NotesSearch />
            <NoteList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  editMode: state.notes.editMode,
  noteToEdit: state.notes.noteToEdit,
  show: state.modal.show,
  loggedIn: state.auth.user !== null
});

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));