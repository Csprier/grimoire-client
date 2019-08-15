import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Async Actions
import { folderIdToView, deleteFolderFromDatabase } from '../../actions/folders.actions';

// CSS
import '../css/folders/folder.css';

class Folder extends Component {
  redirectToFolder = (e, id) => {
    e.preventDefault();
    id = id || e.target.value;
    this.props.dispatch(folderIdToView(id));
    this.props.history.push(`/folder/${id}`)
  }

  handleDeleteFolder = (e) => {
    let folderId = e.target.value,
        userId = this.props.userId;
    this.props.dispatch(deleteFolderFromDatabase(userId, folderId))
  }

  render() {
    const folderId = this.props.folder._id;
    return (
      <div 
        className="folder" 
        key={this.props.folder._id} 
        onClick={(e) => this.redirectToFolder(e, folderId)}
      >
        <p>{`${this.props.folder.name}`}</p>
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
});

export default withRouter(connect(mapStateToProps)(Folder));