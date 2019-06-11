import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Actions
import { toggleEditMode, getNoteByIdToEdit } from '../../actions/notes.actions';

// CSS 
import '../css/notes/edit-note.css';

class EditNoteForm extends Component {
  constructor() {
    super();
    this.state = {
      editNote: {
        id: '',
        title: '',
        content: '',
        tags: [],
        folders: []
      },
      editedValues: {
        title: '',
        content: '',
        tags: [],
        folders: []
      },
      renderTagInput: false,
      renderFolderInput: false,
      newTagValue: '',
      newFolderValue: ''
    }
    this.handleTitleValueChange = this.handleTitleValueChange.bind(this);
    this.handleContentValueChange = this.handleContentValueChange.bind(this);
    this.renderTagInput = this.renderTagInput.bind(this);
    this.renderFolderInput = this.renderFolderInput.bind(this);
    this.addTag = this.addTag.bind(this);
    this.addFolder = this.addFolder.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.removeFolder = this.removeFolder.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getNoteByIdToEdit(this.props.noteToEdit))
    .then((res) => {
      if (res) {
        this.setState({
          editNote: {
            id: res._id,
            title: res.title,
            content: res.content,
            tags: res.tags,
            folders: res.folders
          }
        });
      } else {
        return;
      }
    });
  }

  handleTitleValueChange = (e) => {
    e.preventDefault();
    this.setState = ({
      editedValues: {
        title: e.target.value
      }
    });
  }

  handleContentValueChange = (e) => {
    e.preventDefault();
    this.setState = ({
      editedValues: {
        content: e.target.value
      }
    });
  }

  renderTagInput = (e) => {
    e.preventDefault();
    this.setState({
      renderTagInput: !this.state.renderTagInput
    });
  }

  renderFolderInput = (e) => {
    e.preventDefault();
    this.setState({
      renderFolderInput: !this.state.renderFolderInput
    });
  }

  // Add chips
  handleAddTag = (e) => {
    e.preventDefault();
    this.setState({
      newTagValue: e.target.value
    });
  }
  addTag = (e) => {
    e.preventDefault();
    let tag = e.target.value;
    this.setState({
      editedValues: {
        tags: [ ...this.state.editNote.tags, tag ]
      },
      renderTagInput: false,
      newTagValue: ''
    });
  }

  addFolder = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  // Remove chips
  removeTag = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }
  removeFolder = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  } 

  // Submit
  handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
    let id = this.state.editNote.id,
        title = e.target.elements.editTitle.value,
        content = e.target.elements.editContent.value;

    let form = {
      id,
      title,
      content
    }
    console.log(form);
  }

  // Redirect/cancel, move back to dashboard/notelist
  cancelEdit = e => {
    e.preventDefault();
    this.props.dispatch(toggleEditMode());
  }

  render() {
    console.log('ENFs:', this.state);
    if (this.props.editMode === false) {
      return <Redirect to="/dashboard" />
    }

    return(
      <div>
        <h4>Edit Note</h4>
        <form onSubmit={this.handleEditSubmit}>
          <label>
            Title:
            <input
              name="editTitle"
              defaultValue={this.state.editNote.title}
              type="text"
              onChange={(e) => this.handleTitleValueChange(e)}
            />
          </label>
          <label>
            Content:
            <textarea 
              name="editContent"
              value={this.state.editNote.content}
              type="text"
              rows="4" cols="50"
              onChange={(e) => this.handleContentValueChange(e)}
            />  
          </label>

          <div className="edit-tags-container">
            {(this.state.renderTagInput === true) 
              ? null 
              : <button name="add-tags" onClick={this.renderTagInput}>Add tags</button>}
            {(this.state.renderTagInput === false)
              ? <ul>
                {(this.state.editNote.tags.length > 0) 
                  ? this.state.editNote.tags.map(tag => {
                      return <li key={tag._id}>
                                {tag.name}
                                <button 
                                  onClick={this.removeTag}
                                  value={tag._id}
                                >&times;</button>
                              </li>
                            }) 
                  : <p>No tags to edit</p>}
                </ul>
              : <div className="add-tag-input-container">
                  <label>Add tags:</label>
                  <input 
                    id="add-tag"
                    type="text"
                    placeholder="Add a tag..."
                    onChange={this.handleAddTag}
                  />
                  <button 
                    onClick={this.addTag} 
                    value={this.state.newTagValue}
                  >Add</button>
                </div>}
          </div>

          <div className="edit-folders-container"> 
            <button name="add-folders" onClick={this.renderFolderInput}>Add folders</button>
            {/* <ul>
              {(this.state.editNote.folders.length > 0) 
                ? this.state.editNote.folders.map(folder => {
                    return <li key={folder._id}>
                            {folder.name}
                            <button 
                              onClick={this.removeFolder}
                              value={folder._id}
                            >&times;</button>
                          </li>
                        }) 
                : <p>No folders to edit</p>}
            </ul> */}
          </div>
          <button type="submit">Save Changes</button>
          <button onClick={this.cancelEdit}>Cancel</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  auth: state.auth,
  editMode: state.notes.editMode,
  noteToEdit: state.notes.noteToEdit
});

export default connect(mapStateToProps)(EditNoteForm);