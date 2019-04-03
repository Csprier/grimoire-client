import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async actions
import { getNotes } from '../../actions/notes.actions';

// CSS
import '../css/notes-list.css';

class NoteList extends Component {
  componentDidMount() {
    this.props.dispatch(getNotes());
  }

  render() {
    let notes = this.props.notes.map(note => {
      return (
        <li className="note" key={note.id}>
          <h3>FI: {note.folderId} || {note.title}</h3>
          <p>{note.content}</p>
          <ul className="tags-container">
            <h4>Tags:</h4>
            {note.tags.map(tag => <li key={tag._id}>{tag.name}</li>)}
          </ul>
        </li>
      )
    })

    return (
      <div className="note-list-container">
        <h2>Your notes</h2>
        <ul className="notes-list">
          {notes}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  notes: state.notes.data
});

export default RequiresLogin()(connect(mapStateToProps)(NoteList));