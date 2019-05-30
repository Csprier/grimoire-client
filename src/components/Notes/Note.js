import React, { Component } from 'react';
import { connect } from 'react-redux';

// Async Actions
import { deleteNoteById, removeTagFromNoteById, removeFolderFromNoteById } from '../../actions/notes.actions';

// CSS
import '../css/notes/note.css';


class Note extends Component {
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
                      <li key={folder._id}>
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

          <button 
            className="delete-button" 
            onClick={this.handleDelete} 
            value={id}
          >Delete Note</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

export default connect(mapStateToProps)(Note);