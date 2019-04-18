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

  handleDeleteNoteFromUser = (e) => {
    let noteId = e.target.value;
    console.log(`Delete note ${noteId} from User ${this.props.userId}`)
  }

  render() {
    const { key, title, id, content, tags } = this.props.note;
    return (
      <div className="note" key={key}>
        <h4>{title}</h4>
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
                    onClick={this.handleDeleteNoteFromUser}
                    value={id}
                  >X</button>
                </li>)
            })
            : <p>No tags added yet</p>}
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