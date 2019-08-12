import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Note from '../Notes/Note';
import NotesSearch from '../Notes/NotesSearch';
import NavigationBar from '../NavigationBar';

// Async Actions
import { getNotes } from '../../actions/notes.actions';

// CSS
import '../css/folders/folder-note-list.css';

class FolderNoteList extends Component {
  componentDidMount() {
    this.props.dispatch(getNotes());
  }

  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    const folderName = this.props.folders.filter(folder => folder._id === this.props.currentFolderId).map(item => item.name)[0];
    let notesInTheFolder = this.props.notes.filter(note => {
      let noteWithFolder;
      for (let i = 0; i < note.folders.length; i++) {
        if (note.folders[i]._id === this.props.currentFolderId) {
          noteWithFolder = note;
        }
      }
      return noteWithFolder;
    });
    
    const defaultNotes = (notesInTheFolder !== undefined || notesInTheFolder.length !== 0) 
                            ? notesInTheFolder.map((note, i) => <Note note={note} key={i} />)
                            : <p>No notes in this folder</p>;
    const filteredNotes = notesInTheFolder.filter(note => note.title.includes(this.props.searchTerm)).map((note, i) => <Note note={note} key={i} />)

    return (
      <div className="folder-note-list-component-container">
        <header>
          <NavigationBar />
        </header>
        <div className="folder-note-list-under-nav">
          <div className="under-nav-title-and-redirect">
            <h4>{folderName}</h4>
            <button onClick={this.returnToDashboard}>&#60;  Dashboard</button>
          </div>
          <NotesSearch />
        </div>
        <div>
          {(this.props.searchTerm.length !== 0) 
            ? filteredNotes
            : defaultNotes }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  notes: state.notes.data,
  folders: state.folders.data,
  currentFolderId: state.folders.folderIdForViewing,
  searchTerm: state.search.query.searchTerm,
  filtered: state.notes.filtered || []
});

export default connect(mapStateToProps)(FolderNoteList);