import React, { Component } from 'react';
import { connect } from 'react-redux';

// Async actions
import { getFolders, deleteFolderFromDatabase, toggleAddFolderInputRender } from '../../actions/folders.actions';

// Components
import AddFolderInput from './AddFolderInput';

// CSS
// import './css/folder-manager.css';

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
    console.log(`Delete: ${folderId} from database. UserId: ${userId}`);
    this.props.dispatch(deleteFolderFromDatabase(userId, folderId))
  }

  render() {
    const manageableFolders = this.props.folders.map(folder => {
      return (
        <div key={folder.name}>
          <p>{folder.name}</p>
          <button
            value={folder._id}
            onClick={this.handleDeleteFolder}
          >X</button>
        </div>
      )
    });

    return (
      <div className="folder-manager-container">
        <div className="folder-managernav">
          <h4>Folders</h4>
          <button onClick={this.returnToDashboard}>&#60; Dashboard</button>
        </div>
        <div>
          {(this.props.renderAddFolderInput)
            ? <AddFolderInput />
            : <button
                className="render-add-folder-input-button"
                onClick={this.toggleRenderFolderInput}            
              >+ New Folder</button>}
        </div>
        {(this.props.folders !== undefined)
          ? manageableFolders
          : <span>No folders in the database</span>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.data,
  renderAddFolderInput: state.folders.renderAddFolderInput
});

export default connect(mapStateToProps)(FolderManager);