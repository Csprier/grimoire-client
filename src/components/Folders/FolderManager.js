import React, { Component } from 'react';
import { connect } from 'react-redux';

// Async actions
import { getFolders, deleteFolderFromDatabase, toggleAddFolderInputRender } from '../../actions/folders.actions';

// Components
import AddFolderInput from './AddFolderInput';

// CSS
import '../css/folders/folder-manager.css';

class FolderManager extends Component {
  componentDidMount() {
    this.props.dispatch(getFolders());
  }

  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  toggleRenderFolderInput = () => {
    this.props.dispatch(toggleAddFolderInputRender());
  }

  handleDeleteFolder = (e) => {
    let folderId = e.target.value,
        userId = this.props.userId;
    this.props.dispatch(deleteFolderFromDatabase(userId, folderId))
  }

  render() {
    const manageableFolders = this.props.folders.map(folder => {
      return (
        <div key={folder.name} className="fm-folder">
          <p>{folder.name}</p>
          <button
            className="fm-folder-delete-button"
            value={folder._id}
            onClick={this.handleDeleteFolder}
          >X</button>
        </div>
      )
    });

    return (
      <div className="folder-manager-container">
        <div className="folder-manager-nav">
          <h4>Folders</h4>
          <button 
            onClick={this.returnToDashboard}
          >&#60; Dashboard</button>
        </div>
        <div className="folder-list">
          {(this.props.folders !== undefined)
            ? manageableFolders
            : <span>No folders in the database</span>
          }
        </div>
        <div className="fm-input-container">
          {(this.props.renderAddFolderInput)
            ? <AddFolderInput />
            : <button
                className="render-add-folder-input-button"
                onClick={this.toggleRenderFolderInput}            
              >+ New Folder</button>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.data,
  renderAddFolderInput: state.folders.renderAddFolderInput
});

export default connect(mapStateToProps)(FolderManager);