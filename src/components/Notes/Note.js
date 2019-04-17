import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
// import AddTag from '../Tags/AddTag';
// import Tag from '../Tags/Tag';

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
        <p>NoteId: {id}</p>
        <p>{content}</p>
    
        <div className="note-information">
          <ul className="tags-container">
            <h4>Tags:</h4>
            {/* <AddTag noteId={id} /> */}
            {(tags.length > 0) 
            ? tags.map((tag, i) => <li key={i}>{tag.name}</li>)
            // ? tags.map(tag => <Tag tag={tag} noteId={id} key={tag._id}/>)
            : <p>No tags added yet</p>}
          </ul>
          <button 
            className="delete-button" 
            onClick={this.handleDelete} 
            value={id}
          >Delete Note</button>
        </div>

      </li>
    )
  }
}

export default connect()(Note);