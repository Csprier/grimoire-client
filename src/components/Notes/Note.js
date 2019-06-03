import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

// Async Actions
import { deleteNoteById, removeTagFromNoteById, removeFolderFromNoteById } from '../../actions/notes.actions';

// CSS
import '../css/notes/note.css';

import EditNoteForm from './EditNoteForm';

class Note extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false
    }
    this.redirectToEditNoteForm = this.redirectToEditNoteForm.bind(this);
  }

  redirectToEditNoteForm = () => {
    this.setState({
      editMode: true
    });
  }

  handleDelete = (e) => {
    let noteId = e.target.value;
    console.log(`Deleting: ${noteId}`);
    this.props.dispatch(deleteNoteById(noteId));
  }

  handleRemoveTagFromNote = (e) => {
    let tagId = e.target.value,
        { id, title, content, tags, folders } = this.props.note;

    let note = { id, title, content, tags, folders };

    console.log(`Delete tag ${tagId} from Note ${note.id}.`)
    this.props.dispatch(removeTagFromNoteById(note, tagId));
  }

  handleRemoveFolderFromNote = (e) => {
    let folderId = e.target.value,
        { id, title, content, tags, folders } = this.props.note;

    let note = { id, title, content, tags, folders };

    console.log(`Delete folder ${folderId} from Note ${note.id}.`);
    this.props.dispatch(removeFolderFromNoteById(note, folderId));
  }

  render() {
    const { key, title, id, content, tags, folders } = this.props.note;
    
    if (this.state.editMode === true) {
      return <EditNoteForm {...this.props.note} />;
      // return <Redirect to={{
      //   path: "/editNote",
      //   search: `/n=${id}`,
      //   state: { note: this.props.note }
      // }} />;
    }

    return (
      <div className="note" key={key}>
        <h4 className="note-title">{title}</h4>
        <p>NoteId: {id}</p>
        <p>{content}</p>
    
        <div className="note-information">
          
          <ul className="tags-container">
            <h4>Tags:</h4>
            {(tags.length > 0) 
              ? tags.map(tag => {
                  if (tag !== null) {
                    return (
                      <li key={tag.name}>
                        {tag.name}
                        <button
                          onClick={this.handleRemoveTagFromNote}
                          value={tag._id}
                        >X</button>
                      </li>
                    )
                  } else {
                    return <p key="noTagsAddedYet">No tags added yet</p>;
                  }
                })
              : <p>No tags added yet</p>}
          </ul>

          <ul className="folders-container">
            <h4>Folders:</h4>
            {(folders.length > 0)
              ? folders.map(folder => {
                  if (folder !== null) {
                    return (
                      <li key={folder.name}>
                        {folder.name}
                        <button
                          onClick={this.handleRemoveFolderFromNote}
                          value={folder._id}
                        >X</button>
                      </li>
                    )
                  } else {
                    return <p key="NoFoldersAddedYet">No folders added yet</p>;
                  }
                })
              : <p>No folders added yet</p>}
          </ul>
          <div>
            <button
              onClick={this.redirectToEditNoteForm}
              value={this.props.note}
            >Edit</button>
            <button 
              className="delete-button" 
              onClick={this.handleDelete} 
              value={id}
            >Delete Note</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

export default connect(mapStateToProps)(Note);