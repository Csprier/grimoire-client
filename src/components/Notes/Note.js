import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
// import AddTag from '../Tags/AddTag';
// import Tag from '../Tags/Tag';

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
    let userId = this.props.userId,
        tagId = e.target.value,
        { id, title, content, tags, folders } = this.props.note;

    let note = { id, title, content, tags, folders };

    console.log(`Delete tag ${tagId} from Note ${note.id}.`)
    this.props.dispatch(removeTagFromNoteById(note, tagId));
  }

  handleRemoveFolderFromNote = (e) => {
    let userId = this.props.userId,
        folderId = e.target.value,
        { id, title, content, tags, folders } = this.props.note;

    let note = { id, title, content, tags, folders };

    console.log(`Delete folder ${folderId} from Note ${note.id}.`);
    this.props.dispatch(removeFolderFromNoteById(note, folderId));
  }

  render() {
    const { key, title, id, content, tags, folders } = this.props.note;
    console.log(this.props.note);
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
              return (
                <li key={tag._id}>
                  {tag.name}
                  <button
                    onClick={this.handleRemoveTagFromNote}
                    value={tag._id}
                  >X</button>
                </li>)
            })
            : <p>No tags added yet</p>}
          </ul>

          {/* <ul className="folders-container">
            <h4>Folders:</h4>
            {(folders.length > 0)
              ? folders.map(folder => {
                return (
                  <li key={folder._id}>
                    {folder.name}
                    <button
                      onClick={this.handleRemoveFolderFromNote}
                      value={folder._id}
                    >X</button>
                  </li>
                )
              })
              : <p>No folders added yet</p>}
          </ul> */}

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