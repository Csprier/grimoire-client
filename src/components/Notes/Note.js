import React, { Component } from 'react';
import { connect } from 'react-redux';

// Async Actions
import { deleteNoteById } from '../../actions/notes.actions';

// CSS
import '../css/note.css';
import deleteIcon from '../../images/delete-button.png'

class Note extends Component {
  handleDelete = (e) => {
    let noteId = e.target.value;
    this.props.dispatch(deleteNoteById(noteId));
  }

  render() {
    const { key, title, id, content, tags } = this.props.note;
    return (
      <li className="note" key={key}>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="note-information">
          <ul className="tags-container">
            <h4>Tags:</h4>
            {(tags.length > 0) 
            ? tags.map(tag => <li key={tag._id}>{tag.name}</li>) 
            : <p>No tags added yet</p>}
          </ul>
          <button 
            className="delete-button" 
            onClick={this.handleDelete} 
            value={id}
          >
            <img src={deleteIcon} alt="delete note" />
          </button>
        </div>
      </li>
    )
  }
}

export default connect()(Note);