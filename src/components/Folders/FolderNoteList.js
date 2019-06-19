import React, { Component } from 'react';
import { connect } from 'react-redux';

class FolderNoteList extends Component {
  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="folder-note-list-component-container">
        <h4>Folder</h4>
        <button onClick={this.returnToDashboard}>&#60;  Dashboard</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(FolderNoteList);