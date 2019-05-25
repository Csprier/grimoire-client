import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field
} from 'redux-form';

import { addFolderToNewNote } from '../../actions/createNote.actions';

// CSS
import '../css/notes/add-folders-to-notes.css';

class AddFoldersToNotes extends Component {
  constructor() {
    super();
    this.state = {
      selectedFolders: [],
      value: ''
    }
  }

  // CHIPS ========================================
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleDelete = (folderToRemove) => {
    this.setState({
      selectedFolders: this.state.selectedFolders.filter(folder => folder !== folderToRemove)
    });
  }

  /**
   * @description Adds selectedFolderss to state and resets state.value to an empty string
   * @param {event} e - 
   */
  addToSelectedFolders = (e) => {
    let folder = e.target.value;
    this.setState({
      selectedFolders: [ ...this.state.selectedFolders, folder ],
      value: ''
    });
  }

  render() {
    return (
      <div className="add-folders-to-notes-container">

        <div className="selected-folders-container">
          {this.state.selectedFolders.map(folder => {
            return (
              <div key={folder} className="folder-chip">
                <span className="chip-name">{folder}</span>
                <span
                  onClick={() => this.handleDelete(folder)}
                  className="chip-remove"
                >
                  &times;
                </span>
              </div>)
            })}
        </div>

        <div className="add-folder-input-container">
          <Field 
            name="foldersForNote"
            placeholder="Search folders/Add folders..."
            type="text" 
            component="input"
            value={this.state.value}
            onChange={e => {
              this.handleChange(e);
            }}
            className="search-or-add-folder-input"
          />
          <button 
            value={this.state.value} 
            onClick={(e) => this.props.dispatch(addFolderToNewNote(e.target.value))}
            className="add-folder-button"
          >
            Add Folder
          </button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.data
});

export default connect(mapStateToProps)(AddFoldersToNotes);