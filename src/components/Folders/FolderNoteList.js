import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Note from '../Notes/Note';

// Async Actions
import { getNotes } from '../../actions/notes.actions';

class FolderNoteList extends Component {
  componentDidMount() {
    this.props.dispatch(getNotes());
  }

  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  render() {
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
    return (
      <div className="folder-note-list-component-container">
        <h4>Folder</h4>
        <button onClick={this.returnToDashboard}>&#60;  Dashboard</button>
        <div>
          {notesInTheFolder.map((note, i) => <Note note={note} key={i} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  notes: state.notes.data,
  currentFolderId: state.folders.folderIdForViewing
});

export default connect(mapStateToProps)(FolderNoteList);