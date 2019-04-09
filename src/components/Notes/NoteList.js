import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async actions
import { getNotes, deleteNoteById } from '../../actions/notes.actions';

// CSS
import '../css/notes-list.css';

class NoteList extends Component {
  componentDidMount() {
    console.log('fetching notes');
    this.props.dispatch(getNotes());
  }

  handleDelete = (e) => {
    let noteId = e.target.value;
    this.props.dispatch(deleteNoteById(noteId));
  }

  render() {
    const defaultNotes = this.props.notes.map((note, i) => {
      return (
        <li className="note" key={i}>
          <h3>{note.title}</h3>
          <button onClick={this.handleDelete} value={note.id}>Delete</button>
          <p>{note.content}</p>
          <ul className="tags-container">
            <h4>Tags:</h4>
            {(note.tags.length > 0) 
            ? note.tags.map(tag => <li key={tag._id}>{tag.name}</li>) 
            : <p>No tags added yet</p>}
          </ul>
        </li>
      )});
    
    const filteredNotes = this.props.filtered.map((note, i) => {
      return (
        <li className="note" key={i}>
          <h3>{note.title}</h3>
          <button onClick={this.handleDelete}>Delete</button>
          <p>{note.content}</p>
          <ul className="tags-container">
            <h4>Tags:</h4>
            {note.tags.map(tag => <li key={tag._id}>{tag.name}</li>)}
          </ul>
        </li>
      )});

    return (
      <div className="note-list-container">
        <h2>Your notes</h2>
        <ul className="notes-list">
          {(this.props.searchTerm.length !== 0) 
            ? filteredNotes
            : defaultNotes }
        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  notes: state.notes.data,
  searchTerm: state.search.query.searchTerm,
  filtered: state.notes.filtered || []
});

export default RequiresLogin()(connect(mapStateToProps)(NoteList));