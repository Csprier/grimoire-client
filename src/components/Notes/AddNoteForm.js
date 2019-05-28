import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';
import { addTagToNewNote, addFolderToNewNote } from '../../actions/createNote.actions';


class AddNoteForm extends Component {
  constructor() {
    super();
    this.state = {
      titleValue: '',
      contentValue: '',
      tagValue: '',
      folderValue: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleFolderChange = this.handleFolderChange.bind(this);
  }

  cancelNote = () => {
    this.props.history.push('/dashboard');
  };

  handleTitleChange = e => {
    this.setState({
      titleValue: e.target.value
    });
    console.log('Title value:', this.state.titleValue);
  }

  handleContentChange = e => {
    this.setState({
      contentValue: e.target.value
    });
    console.log('Content value:', this.state.contentValue);
  }

  handleTagChange = e => {
    this.setState({
      tagValue: e.target.value
    });
    console.log('Tag value:', this.state.tagValue);
  }

  handleFolderChange = e => {
    this.setState({
      folderValue: e.target.value
    });
    console.log('Folder value:', this.state.folderValue);
  }


  handleSubmit = event => {
    event.preventDefault();
    console.log('handleSubmit', event);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <label>
            Title:
            <input type="text" onChange={this.handleTitleChange} />
          </label>

          <label>
            Content:
            <textarea 
              placeholder="Content..." 
              type="text" 
              className="ta" rows="10" cols="40" 
              onChange={this.handleContentChange}
            />
          </label>

          <div>
            <label>
              Add a Tag:
              <input 
                id="tagsForNote"
                type="text"
                placeholder="Add a tag..."
                onChange={this.handleTagChange}
              />
            </label>
            <button
              value={this.state.tagValue}
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(addTagToNewNote(e.target.value))
                document.getElementById('tagsForNote').value = "";
              }}
            >Add Tag</button>
          </div>

          <div>
            <label>
                Add a Folder:
                <input 
                  id="folderssForNote"
                  type="text"
                  placeholder="Add a folder..."
                  onChange={this.handleFolderChange}
                />
              </label>
              <button
                value={this.state.folderValue}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.dispatch(addFolderToNewNote(e.target.value))
                  document.getElementById('folderssForNote').value = "";
                }}
              >Add Folder</button>
          </div>


        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  tags: state.tags.data,
  folders: state.folders.data,
  createNote: state.createNote,
  error: state.notes.error
});

export default RequiresLogin()(connect(mapStateToProps)(AddNoteForm));
