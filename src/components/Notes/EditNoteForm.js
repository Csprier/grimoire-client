import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Utility functions
import { utility } from '../utility';

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
    this.updateNoteValuesInComponentState = this.updateNoteValuesInComponentState.bind(this);
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
        let noteValues = res;
        this.updateNoteValuesInComponentState(noteValues);
      });
  }

  updateNoteValuesInComponentState = (note) => {
    this.setState({
      editNote: {
        id: note._id,
        title: note.title,
        content: note.content,
        tags: note.tags,
        folders: note.folders
      },
      editedValues: {
        tags: note.tags,
        folders: note.folders
      }
    })
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
        tags: (this.state.editedValues.tags !== []) 
          ? [ ...this.state.editedValues.tags, tag ] 
          : this.state.editedValues.push(tag),
        folders: [ ...this.state.editedValues.folders ]
       },
      renderTagInput: false,
      newTagValue: ''
    });
  }

  handleAddFolder = (e) => {
    e.preventDefault();
    this.setState({
      newFolderValue: e.target.value
    });
  }
  addFolder = (e) => {
    e.preventDefault();
    let folder = e.target.value;
    this.setState({
      editedValues: {
        tags: [ ...this.state.editedValues.tags ],
        folders: (this.state.editedValues.folders !== []) 
          ? [ ...this.state.editedValues.folders, folder ] 
          : this.state.editedValues.folders.push(folder)
      },
      renderFolderInput: false,
      newFolderValue: ''
    });
  }

  // Remove chips
  removeTag = (e) => {
    e.preventDefault();
    let tagToRemove = e.target.value;
    this.setState({
      editedValues: {
        tags: this.state.editedValues.tags.filter(tag => tag !== tagToRemove),
        folders: [ ...this.state.editedValues.folders ]
      }
    });
  }
  removeFolder = (e) => {
    e.preventDefault();
    let folderToRemove = e.target.value;
    this.setState({
      editedValues: {
        tags: [ ...this.state.editedValues.tags ],
        folders: this.state.editedValues.folders.filter(folder => folder !== folderToRemove)
      }
    });
  } 

  // Submit
  handleEditSubmit = (e) => {
    e.preventDefault();
    let userId = this.props.user.id,
        title = e.target.elements.editTitle.value,
        content = e.target.elements.editContent.value;

    let formattedTags = utility.makeNewTagsArray(this.state.editedValues.tags, this.props.tags, userId),
        formattedFolders = utility.makeNewFolderArray(this.state.editedValues.folders, this.props.folders, userId);

    let form = {
      userId,
      title,
      content,
      tags: formattedTags,
      folders: formattedFolders
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

    const tagChips = <ul>
                      {(this.state.editedValues.tags) 
                        ? this.state.editedValues.tags.map(tag => {
                            return (<li key={tag}>
                                      {tag}
                                      <button 
                                        onClick={this.removeTag}
                                        value={tag}
                                      >&times;</button>
                                    </li>
                                  )}) 
                        : null}
                    </ul>
    const addTagInput = <div className="add-tag-input-container">
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
                        </div>
    const folderChips = <ul>
                        {(this.state.editedValues.folders) 
                          ? this.state.editedValues.folders.map(folder => {
                              return (<li key={folder}>
                                      {folder}
                                      <button 
                                        onClick={this.removeFolder}
                                        value={folder}
                                      >&times;</button>
                                    </li>
                                  )}) 
                          : null}
                      </ul> 
    const addFolderInput = <div className="add-folder-input-container">
                            <label>Add folders:</label>
                            <input 
                              id="add-folder"
                              type="text"
                              placeholder="Add a folder..."
                              onChange={this.handleAddFolder}
                            />
                            <button
                              onClick={this.addFolder}
                              value={this.state.newFolderValue}
                            >Add</button>
                          </div>


    return(
      <div className="edit-note-form-container">
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
            {(this.state.renderTagInput) 
              ? null 
              : <button name="add-tags" onClick={this.renderTagInput}>Add tags</button>}
            {(!this.state.renderTagInput)
              ? tagChips
              : addTagInput}
          </div>

          <div className="edit-folders-container"> 
            {(this.state.renderFolderInput)
              ? null 
              : <button name="add-folders" onClick={this.renderFolderInput}>Add folders</button>}
            {(!this.state.renderFolderInput)
              ? folderChips
              : addFolderInput}
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
  noteToEdit: state.notes.noteToEdit,
  tags: state.tags.data,
  folders: state.folders.data
});

export default connect(mapStateToProps)(EditNoteForm);