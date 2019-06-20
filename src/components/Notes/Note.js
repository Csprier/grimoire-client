import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

// Async Actions
import { deleteNoteById } from '../../actions/notes.actions';
import { toggleEditMode, noteToEdit } from '../../actions/notes.actions';

// CSS
import '../css/notes/note.css';

class Note extends Component {
  constructor() {
    super();
    this.state = {
      noteToView: '',
      show: false
    }
  }

  toggleView = (e, id) => {
    e.preventDefault();
    this.setState({
      noteToView: id,
      show: !this.state.show
    });
  }

  redirectToEditNoteForm = (e) => {
    e.preventDefault();
    let noteId = e.target.value;
    // console.log('Note to edit id:', noteId)
    this.props.dispatch(noteToEdit(noteId));
    this.props.dispatch(toggleEditMode());
  }

  handleDelete = (e) => {
    let noteId = e.target.value;
    console.log(`Deleting: ${noteId}`);
    this.props.dispatch(deleteNoteById(noteId));
  }
  
  render() {
    const { key, title, id, content, tags, folders } = this.props.note;
    
    if (this.props.editMode === true && this.props.noteToEdit !== '') {
      return <Redirect to="/editNote" />
    }

    return (
      <div className="note" key={key}>
        <div className="note-title-and-toggle-container">
          <h4 className="note-title">{title}</h4>
          <button
            className="toggle-button"
            value={id}
            onClick={(e) => this.toggleView(e, id)}
          >
            {(this.state.show) 
              ? <span className="arrow-icon">&#10581;</span> 
              : <span className="arrow-icon">&#10584;</span>}
          </button>
        </div>
        <div className={(this.state.show && (this.state.noteToView === id))? "note-data-container show" : "note-data-container hidden"}>
          <p>{content}</p>
      
          <div className="note-information">
            <ul className="tags-container">
              <h4>Tags:</h4>
              {(tags.length > 0) 
                ? tags.map(tag => {
                    if (tag !== null) {
                      return (
                        <li key={tag.name}>
                          {tag.name}
                        </li>
                      )
                    } else {
                      return <p key="noTagsAddedYet">No tags added yet</p>;
                    }
                  })
                : <p>No tags added yet</p>}
            </ul>
            <ul className="folders-container">
              <h4>Folders:</h4>
              {(folders.length > 0)
                ? folders.map(folder => {
                    if (folder !== null) {
                      return (
                        <li key={folder.name}>
                          {folder.name}
                        </li>
                      )
                    } else {
                      return <p key="NoFoldersAddedYet">No folders added yet</p>;
                    }
                  })
                : <p>No folders added yet</p>}
            </ul>
          </div>

          <div className="button-container">
            <button
              className="edit-button"
              onClick={this.redirectToEditNoteForm}
              value={this.props.note.id}
            >Edit</button>
            <button 
              className="delete-button" 
              onClick={this.handleDelete} 
              value={id}
            >Delete Note</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  notes: state.notes,
  editMode: state.notes.editMode,
  noteToEdit: state.notes.noteToEdit
})

export default connect(mapStateToProps)(Note);