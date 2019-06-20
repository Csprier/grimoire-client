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
    let notesInTheFolder = [];
    for (let i = 0; i < this.props.notes.length; i++) {
      if (this.props.notes[i].folders.length > 0) {
        for (let x = 0; x < this.props.notes[i].folders.length; x++) {
          if (this.props.notes[i].folders[x]._id === this.props.currentFolderId) {
            notesInTheFolder.push(this.props.notes[i]);
          }
        }
      }
    }
    
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
          <h4>{folderName}</h4>
          <button onClick={this.returnToDashboard}>&#60;  Dashboard</button>
        </div>
        <div>
          <NotesSearch />
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