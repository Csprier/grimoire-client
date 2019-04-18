import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async actions
// import { getNotes, deleteNoteById } from '../../actions/notes.actions';
import { getNotes } from '../../actions/notes.actions';
import { getTags } from '../../actions/tags.actions';

// Components
import Note from './Note';

// CSS
import '../css/notes/notes-list.css';

class NoteList extends Component {
  componentDidMount() {
    console.log('NoteList mounted, fetching notes & tags.');
    this.props.dispatch(getNotes());
    this.props.dispatch(getTags());
    console.log('Notes and tags fetched.')
  }

  render() {
    const defaultNotes = (this.props.notes !== undefined) 
      ? this.props.notes.map((note, i) => <Note note={note} key={i} />)
      : <p>No notes in the database</p>;
    const filteredNotes = this.props.filtered.map((note, i) => <Note note={note} key={i} />);

    return (
      <div className="note-list-container">
        <h4>You have {this.props.notes.length} notes!</h4>
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
  notes: state.notes.data || [],
  tags: state.tags.data || [],
  searchTerm: state.search.query.searchTerm,
  filtered: state.notes.filtered || []
});

export default RequiresLogin()(connect(mapStateToProps)(NoteList));