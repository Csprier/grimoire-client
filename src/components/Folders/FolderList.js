import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions
import { getFolders } from '../../actions/folders.actions';

// Compontents
// import AddFolderInput from './AddFolderInput';
import Folder from './Folder';

// CSS
import '../css/folders/folder-list.css';

class FolderList extends Component {
  componentDidMount() {
    this.props.dispatch(getFolders());
  }

  // returnToDashboard = () => {
  //   this.props.history.push('/dashboard');
  // }

  render() {
    return (
      <div className="folder-list-container">
        <div className="folder-list-nav">
          <h4>Folders</h4>
          {/* <button onClick={this.returnToDashboard}>&#60;  Dashboard</button> */}
        </div>
        {/* <AddFolderInput /> */}
        <div className="folder-list">
          {(this.props.folders !== undefined)
            ? this.props.folders.map((folder, i) => <Folder folder={folder} key={i} />)
            : <span>No folders in the database</span>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.data
})

export default RequiresLogin()(connect(mapStateToProps)(FolderList));