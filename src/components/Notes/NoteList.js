import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async actions
import { getNotes } from '../../actions/notes.actions';
import { getTags } from '../../actions/tags.actions';
import { getFolders } from '../../actions/folders.actions';

// Components
import Note from './Note';

// CSS
import '../css/notes/notes-list.css';

class NoteList extends Component {
  componentDidMount() {
    this.props.dispatch(getNotes());
    this.props.dispatch(getTags());
    this.props.dispatch(getFolders());
    console.log('Notes, tags, and folders fetched.')
  }

  render() {
    const defaultNotes = (this.props.notes !== undefined) 
                          ? this.props.notes.map((note, i) => {
                              console.log(`${i}, ${note}`, note);
                              return <Note note={note} key={i} />
                            })
                          : <p>No notes in the database</p>;
    const filteredNotes = this.props.filtered.map((note, i) => {
                            console.log('filteredNote', note);
                            return <Note note={note} key={i} />
                          });

    return (
      <div className="note-list-container">
        <h4 className="note-counter">You have {this.props.notes.length} notes!</h4>
        <div className="notes-list">
          {(this.props.searchTerm.length !== 0) 
            ? filteredNotes
            : defaultNotes }
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  notes: state.notes.data || [],
  tags: state.tags.data || [],
  folders: state.folders.data || [],
  searchTerm: state.search.query.searchTerm,
  filtered: state.notes.filtered || []
});

export default RequiresLogin()(connect(mapStateToProps)(NoteList));