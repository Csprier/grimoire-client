import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field
} from 'redux-form';

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

  handleChange = (e) => {
    this.setState({
      value: e.target.value.trim()
    });
  }

  handleDelete = (folderToRemove) => {
    this.setState({
      selectedFolders: this.state.selectedFolders.filter(folder => folder !== folderToRemove)
    });
  }

  addToSelectedFolders = (e) => {
    e.preventDefault();
    let folder = e.target.value;
    this.setState({
      selectedFolders: [ ...this.state.selectedFolders, folder ],
      value: ''
    });
  }

  render() {
    console.log('value: ', this.state.value);
    console.log('Selected Folders: ', this.state.selectedFolders);
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
            })
          }
        </div>

        <div className="add-folder-input-container">
          <Field 
            name="folders-for-note"
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
            onClick={(e) => this.addToSelectedFolders(e)}
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