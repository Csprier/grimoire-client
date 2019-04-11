import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async actions
// import { getNotes, deleteNoteById } from '../../actions/notes.actions';
import { getNotes } from '../../actions/notes.actions';

// Components
import Note from './Note';

// CSS
import '../css/notes-list.css';

class NoteList extends Component {
  componentDidMount() {
    console.log('NoteList mounted, fetching notes.');
    this.props.dispatch(getNotes());
  }

  render() {
    const defaultNotes = this.props.notes.map((note, i) => <Note note={note} key={i} />);
    const filteredNotes = this.props.filtered.map((note, i) => <Note note={note} key={i} />);

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