import React, { Component } from 'react';
import { connect } from 'react-redux';

// Async actions
import { getFolders, deleteFolderFromDatabase } from '../../actions/folders.actions';

// CSS
// import './css/folder-manager.css';

class FolderManager extends Component {
  componentDidMount() {
    this.props.dispatch(getFolders());
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
        <div>
          <p>{folder.name}</p>
          <button
            value={folder._id}
            onClick={this.handleDeleteFolder}
          >&#187;</button>
        </div>
      )
    });

    return (
      <div>
        {manageableFolders}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.data
});

export default connect(mapStateToProps)(FolderManager);