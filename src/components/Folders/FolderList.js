import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions
import { getFolders, toggleAddFolderInputRender } from '../../actions/folders.actions';

// Compontents
import AddFolderInput from './AddFolderInput';
import Folder from './Folder';

// CSS
import '../css/folders/folder-list.css';

class FolderList extends Component {
  componentDidMount() {
    this.props.dispatch(getFolders());
  }

  componentWillUpdate = (prevProps) => {
    return (prevProps.folders !== this.props.folders) 
              ? this.props.dispatch(getFolders())
              : null;
  }

  toggleRenderFolderInput = () => {
    this.props.dispatch(toggleAddFolderInputRender());
  }

  render() {
    return (
      <div className="folder-list-container">
        <div className="folder-list-nav">
          <h4>Folders</h4>
        </div>
        <div className="fl-main">
          <div className="folder-list">
            {(this.props.folders !== undefined)
              ? this.props.folders.map((folder, i) => <Folder folder={folder} key={i} />)
              : <span>No folders in the database</span>
            }
          </div>
          <div className="new-folder-button-container">
            {(this.props.renderAddFolderInput)
              ? <AddFolderInput />
              : <button
                  className="render-add-folder-input-button"
                  onClick={this.toggleRenderFolderInput}            
                >+ New Folder</button>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.data,
  renderAddFolderInput: state.folders.renderAddFolderInput
})

export default RequiresLogin()(connect(mapStateToProps)(FolderList));