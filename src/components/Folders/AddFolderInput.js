import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Actions
import { addNewFolder, toggleAddFolderInputRender } from '../../actions/folders.actions';

// CSS
import '../css/folders/add-folder.css';

class AddFolderInput extends Component {
  constructor() {
    super();
    this.state = {
      folderValue: '',
      foldersToAddToDatabase: []
    }
  }

  handeFolderValueChange = e => {
    this.setState({
      folderValue: e.target.value
    });
  }
  
  makeNewFolderArray = (folders, userId) => {
    let newFolders = {};
    let folderArray = [];

    folders.forEach(folder => {
      newFolders[folder] = {
        name: folder,
        userId
      }
    });

    for (let key in newFolders) {
      folderArray.push(newFolders[key]);
    }

    let finalizedFolders = folderArray.map((folder) => {
      if ( folder.id) {
        let formattedFolder = {
          _id: folder.id,
          name: folder.name
        }
        return formattedFolder;
      } else {
        return folder;
      }
    });
    return finalizedFolders;
  };

  handleClick = e => {
    let folderToAdd = e.target.value;
    this.setState({
      folderValue: '',
      foldersToAddToDatabase: [ ...this.state.foldersToAddToDatabase, folderToAdd ]
    });
  }

  removeChip = folder => {
    let folderToRemove = folder;
    this.setState({
      foldersToAddToDatabase: this.state.foldersToAddToDatabase.filter(folder => folder !== folderToRemove)
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    let userId = this.props.userId;
    let foldersToBeSubmitted = this.makeNewFolderArray(this.state.foldersToAddToDatabase, userId);
    this.props.dispatch(addNewFolder(foldersToBeSubmitted))
      .then(() => {
        this.setState({
          folderValue: '',
          foldersToAddToDatabase: []
        });
        this.props.dispatch(toggleAddFolderInputRender());
      })
      .catch(e => console.error('HANDLE SUBMIT ERROR', e));
  }


  render() {
    return (
      <div className="add-folder-input-component-container">
        <div className="add-folder-form-container">
          <form 
            className="add-folder-form"
            onSubmit={this.handleSubmit}
          >
            <input 
              id="createAFolderInput"
              type="text"
              placeholder="Add a folder"
              onChange={this.handeFolderValueChange}
              value={this.state.folderValue}
              className="add-folder-form-input"
            />
            <div className="add-folder-chip-container">
              {this.state.foldersToAddToDatabase.map(folder => {
                return (
                  <div key={folder} className="add-folder-form-chip">
                    <span>{folder}</span>
                    <span
                      onClick={() => {
                        this.removeChip(folder);
                      }}
                      className="folder-chip-remove-button"
                    >
                      &times;
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="add-folder-button-container">
              <button
                value={this.state.folderValue}
                onClick={(e) => {
                  e.preventDefault();
                  this.handleClick(e);
                  document.getElementById('createAFolderInput').value = "";
                }}
                className="af-btn af-chip"
              >&#43;</button>
              <button
                id="addFolderInputSubmit"
                type="submit"
                className="af-btn af-submit"
              >Create Folder(s)</button>
              <button
                className="af-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    folderValue: '',
                    foldersToAddToDatabase: []
                  });
                  this.props.dispatch(toggleAddFolderInputRender());
                }}
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  error: state.folders.error
});

export default RequiresLogin()(connect(mapStateToProps)(AddFolderInput));