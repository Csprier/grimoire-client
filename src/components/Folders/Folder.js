import React, { Component } from 'react';
import { connect } from 'react-redux';

// Async Actions
import { deleteFolderFromDatabase } from '../../actions/folders.actions';

// CSS
import '../css/folders/folder.css';

class Folder extends Component {
  handleDeleteFolder = (e) => {
    let folderId = e.target.value,
        userId = this.props.userId;
    console.log(`Delete: ${folderId} from database. UserId: ${userId}`);
    this.props.dispatch(deleteFolderFromDatabase(userId, folderId))
  }

  render() {
    return (
      <div className="folder" key={this.props.folder.id}>
        <p>{this.props.folder.name}</p>
        <button
          className="folder-delete-button"
          onClick={this.handleDeleteFolder}
          value={this.props.folder.id}
        >X</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

export default connect(mapStateToProps)(Folder);