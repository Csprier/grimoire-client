import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Actions
import { addNewFolder } from '../../actions/folders.actions';

class AddFolderInput extends Component {
  constructor() {
    super();
    this.state = {
      folderValue: '',
      foldersToAddToDatabase: []
    }
    this.handeFolderValueChange = this.handeFolderValueChange.bind(this);
    this.makeNewFolderArray = this.makeNewFolderArray.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeChip = this.removeChip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log('Add Folder to component state', folderToAdd);
    this.setState({
      folderValue: '',
      foldersToAddToDatabase: [ ...this.state.foldersToAddToDatabase, folderToAdd ]
    });
  }

  removeChip = folder => {
    console.log('Remove folder chip', folder);
    let folderToRemove = folder;
    this.setState({
      foldersToAddToDatabase: this.state.foldersToAddToDatabase.filter(folder => folder !== folderToRemove)
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    let userId = this.props.userId;
    let foldersToBeSubmitted = this.makeNewFolderArray(this.state.foldersToAddToDatabase, userId);
    console.log('Folders To Be Submitted', foldersToBeSubmitted);
    this.props.dispatch(addNewFolder(foldersToBeSubmitted))
      .then(() => {
        this.setState({
          folderValue: '',
          foldersToAddToDatabase: []
        });
      })
      .catch(e => console.error('HANDLE SUBMIT ERROR', e));
  }


  render() {
    return (
      <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Add a Folder:
                <input 
                  id="createAFolderInput"
                  type="text"
                  placeholder="Add a folder"
                  onChange={this.handeFolderValueChange}
                  value={this.state.folderValue}
                />
              </label>
              <button
                value={this.state.folderValue}
                onClick={(e) => {
                  e.preventDefault();
                  this.handleClick(e);
                  document.getElementById('createAFolderInput').value = "";
                }}
              >Add Chip</button>
              <button
                id="addFolderInputSubmit"
                type="submit"
              >Add Folders</button>
            </form>
          </div>
          <div>
            {this.state.foldersToAddToDatabase.map(folder => {
              return (
                <div key={folder} className="add-folder-chip">
                  <span>{folder}</span>
                  <span
                    onClick={() => {
                      this.removeChip(folder);
                    }}
                    className="chip-remove"
                  >
                    &times;
                  </span>
                </div>
              )
            })}
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