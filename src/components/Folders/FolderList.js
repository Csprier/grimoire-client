import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions

// Compontents
import AddFolder from './AddFolder';

// CSS
// import '../css/folders/folder-list.css';

class FolderList extends Component {
  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  deleteFolderFromDatabase = (e) => {
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="folder-list-container">
        <div className="folder-list-nav">
          <h4>Your folders</h4>
          <button onClick={this.returnToDashboard}>&#60;  Dashboard</button>
        </div>
        <AddFolder />
        <div className="folder-list">
          { (this.props.folders !== undefined)
              ? this.props.folders.map(folder => {
                  return (
                    <div key={folder.id}>
                      <h5>{folder.name}</h5>
                      <p>{folder.id}</p>
                      <button onClick={this.deleteFolderFromDatabase} value={folder.id}>X</button>
                    </div>
                  )})
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