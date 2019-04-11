import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteNoteById } from '../../actions/notes.actions';

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
        <button onClick={this.handleDelete} value={id}>Delete</button>
        <p>{content}</p>
        <ul className="tags-container">
          <h4>Tags:</h4>
          {(tags.length > 0) 
          ? tags.map(tag => <li key={tag._id}>{tag.name}</li>) 
          : <p>No tags added yet</p>}
        </ul>
      </li>
    )
  }
}

export default connect()(Note);