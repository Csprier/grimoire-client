import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Async Actions
import { folderIdToView, deleteFolderFromDatabase } from '../../actions/folders.actions';

// CSS
import '../css/folders/folder.css';

class Folder extends Component {
  redirectToFolder = (e) => {
    e.preventDefault();
    let id = e.target.value;
    console.log('Redirecting to Folder:', id);
    this.props.dispatch(folderIdToView(id));
    this.props.history.push(`/folder/${id}`)
  }

  handleDeleteFolder = (e) => {
    let folderId = e.target.value,
        userId = this.props.userId;
    console.log(`Delete: ${folderId} from database. UserId: ${userId}`);
    this.props.dispatch(deleteFolderFromDatabase(userId, folderId))
  }

  render() {
    return (
      <div className="folder" key={this.props.folder._id}>
        <p>{this.props.folder.name}</p>
        {/* <button
          className="folder-delete-button"
          onClick={this.handleDeleteFolder}
          value={this.props.folder._id}
        >X</button> */}
        <button
          className="folder-redirect-button"
          value={this.props.folder._id}
          onClick={this.redirectToFolder}
        >&#187;</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

export default withRouter(connect(mapStateToProps)(Folder));