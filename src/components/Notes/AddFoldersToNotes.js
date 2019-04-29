import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field
} from 'redux-form';

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
      <div>
        <h5>Add a folder...</h5>
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
        <button value={this.state.value} onClick={(e) => this.addToSelectedFolders(e)}>+ Folder</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.data
})

export default connect(mapStateToProps)(AddFoldersToNotes);