import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import AddTag from '../Tags/AddTag';
import Tag from '../Tags/Tag';

// Async Actions
import { deleteNoteById } from '../../actions/notes.actions';

// CSS
import '../css/notes/note.css';


class Note extends Component {
  handleDelete = (e) => {
    let noteId = e.target.value;
    console.log(`Deleting: ${noteId}`);
    this.props.dispatch(deleteNoteById(noteId));
  }

  render() {
    const { key, title, id, content, tags } = this.props.note;
    return (
      <li className="note" key={key}>
        <h4>{title}</h4>
        <p>{content}</p>

        <div className="note-information">
          <ul className="tags-container">
            <h4>Tags:</h4>
            <AddTag />
            {(tags.length > 0) 
            ? tags.map(tag => <Tag tag={tag} key={tag._id}/>)
            : <p>No tags added yet</p>}
          </ul>
          <button 
            className="delete-button" 
            onClick={this.handleDelete} 
            value={id}
          >X</button>
        </div>

      </li>
    )
  }
}

export default connect()(Note);