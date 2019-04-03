import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async actions
import { getNotes } from '../../actions/notes.actions';

class NoteList extends Component {
  componentDidMount() {
    console.log('NoteList componentDidMount');
    this.props.dispatch(getNotes());
  }

  render() {
    let notes = this.props.notes.map(note => {
      console.log(note);
      // return (
      //   <li className="note">
      //     <h3>FI: {note.folderId} || {note.title}</h3>
      //     <p>{note.content}</p>
      //     <p>Tags: {note.tags.map(tag => <p>{tag}</p>)}</p>
      //   </li>
      // )
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