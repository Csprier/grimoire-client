import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions

// Compontents

// CSS

class FolderList extends Component {
  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="folder-list-container">
        <h4>Your folders</h4>
        <button onClick={this.returnToDashboard}>&#60;  Dashboard</button>
        <div className="folder-list">
          { (this.props.folders !== undefined)
              ? this.props.folders.map(folder => {
                return (
                  <div>
                    <h5>{folder.name}</h5>
                    <p>{folder.id}</p>
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