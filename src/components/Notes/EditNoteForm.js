import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Utility functions
import { utility } from '../utility';

// Actions
import { toggleEditMode, getNoteByIdToEdit } from '../../actions/notes.actions';
import { 
  addTagForEditNote, 
  addFolderForEditNote, 
  removeTagForEditNote, 
  removeFolderForEditNote, 
  addNotesPreExistingTags,
  addNotesPreExistingFolders,
  editNotePutRequest, 
  renderTagInputAction,
  renderFolderInputAction,
  editNewTitleValue,
  editNewContentValue,
  editNewTagValue,
  editNewFolderValue,
  resetEditNoteReduxStateValues
} from '../../actions/editNote.actions';

// CSS 
import '../css/notes/edit-note.css';

class EditNoteForm extends Component {
  _isMounted = false;
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

  // When EditNoteForm mounts, dispatch an async action to get the note's property values
  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(getNoteByIdToEdit(this.props.noteToEdit))
      .then((res) => {
        // console.log('ENFCDMres', res);
        let noteValues = res;
        this.updateNoteValuesInComponentState(noteValues);
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.props.dispatch(resetEditNoteReduxStateValues());
  }

  // Update values in state to represent what goes into the note to be edited
  updateNoteValuesInComponentState = (note) => {
    // console.log('updateNoteValuesInComponentState', note);
    this.setState({
      editNote: {
        id: note.id,
        title: note.title,
        content: note.content,
        tags: note.tags,
        folders: note.folders
      },
      editedValues: {
        title: note.title,
        content: note.content,
        tags: note.tags,
        folders: note.folders
      }
    })
    this.props.dispatch(addNotesPreExistingTags(note.tags));
    this.props.dispatch(addNotesPreExistingFolders(note.folders));
  }

  // update values in state onchange
  handleTitleValueChange = (e) => {
    e.preventDefault();
    this.props.dispatch(editNewTitleValue(e.target.value));
  }
  handleContentValueChange = (e) => {
    e.preventDefault();
    this.props.dispatch(editNewContentValue(e.target.value));
  }

  // set state values to conditionally render input elements to add tags/folders
  renderTagInput = (e) => {
    e.preventDefault();
    this.props.dispatch(renderTagInputAction());
  }
  renderFolderInput = (e) => {
    e.preventDefault();
    this.props.dispatch(renderFolderInputAction());
  }

  // Add Tag chips
  handleAddTag = (e) => {
    e.preventDefault();
    this.props.dispatch(editNewTagValue(e.target.value));
  }
  addTag = (e) => {
    e.preventDefault();
    let tag = e.target.value;
    this.props.dispatch(addTagForEditNote(tag));
    this.props.dispatch(renderTagInputAction());
    this.setState({
      newTagValue: ''
    });
  }
  // Add Folder chips
  handleAddFolder = (e) => {
    e.preventDefault();
    this.props.dispatch(editNewFolderValue(e.target.value));
  }
  addFolder = (e) => {
    e.preventDefault();
    let folder = e.target.value;
    this.props.dispatch(addFolderForEditNote(folder));
    this.props.dispatch(renderFolderInputAction());
    this.setState({
      newFolderValue: ''
    });
  }

  // Remove chips
  removeTag = (e) => {
    e.preventDefault();
    let tagToRemove = e.target.value;
    this.props.dispatch(removeTagForEditNote(tagToRemove));
    // this.setState({
    //   editedValues: {
    //     tags: this.state.editedValues.tags.filter(tag => tag !== tagToRemove),
    //     folders: [ ...this.state.editedValues.folders ]
    //   }
    // });
  }
  removeFolder = (e) => {
    e.preventDefault();
    let folderToRemove = e.target.value;
    this.props.dispatch(removeFolderForEditNote(folderToRemove));
    // this.setState({
    //   editedValues: {
    //     tags: [ ...this.state.editedValues.tags ],
    //     folders: this.state.editedValues.folders.filter(folder => folder !== folderToRemove)
    //   }
    // });
  } 

  // Submit
  handleEditSubmit = (e) => {
    e.preventDefault();
    let userId = this.props.user.id;
    let id = this.state.editNote.id;
    let title = (this.props.titleValue === '') 
                  ? this.state.editNote.title 
                  : this.props.titleValue;
    let content = (this.props.contentValue === '') 
                    ? this.state.editNote.content
                    : this.props.contentValue;

    let formattedTags = (this.props.reduxTags === []) 
                          ? [] 
                          : utility.makeNewTagsArray(this.props.reduxTags, this.props.tags, userId);
    let formattedFolders = (this.props.reduxFolders === []) 
                              ? [] 
                              : utility.makeNewFolderArray(this.props.reduxFolders, this.props.folders, userId);

    let updatedNote = {
      userId,
      id,
      title,
      content,
      tags: formattedTags,
      folders: formattedFolders
    }
    // console.log('Sending updated note to the server: ', updatedNote);
    this.props.dispatch(editNotePutRequest(id, updatedNote));
    this.props.dispatch(toggleEditMode());
  }

  // Redirect/cancel, move back to dashboard/notelist
  cancelEdit = (e) => {
    e.preventDefault();
    this.setState({
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
      newContentValue: '',
      newTagValue: '',
      newFolderValue: ''
    });
    this.props.dispatch(toggleEditMode());
  }

  render() {
    if (this.props.editMode === false) {
      return <Redirect to="/dashboard" />
    }

    const tagChips = <ul className="tag-chips-ul">
                      {(this.props.reduxTags) 
                        ? this.props.reduxTags.map(tag => {
                            return (<li key={tag} className="tag-chips-li">
                                      {tag}
                                      <button 
                                        onClick={(e) => this.removeTag(e)}
                                        className="tag-chip-remove"
                                        value={tag}
                                      >&times;</button>
                                    </li>
                                  )}) 
                        : null}
                    </ul>
    const addTagInput = <div className="edit-add-tag-input-container">
                          {/* <label>Add tags:</label> */}
                          <input 
                            id="add-tag"
                            className="atic-edit-notes-tags-input"
                            type="text"
                            placeholder="Add a tag..."
                            onChange={this.handleAddTag}
                          />
                          <div className="add-tag-input-buttons">
                            <button 
                              className="add-chip"
                              onClick={this.addTag} 
                              value={this.props.tagValue}
                            >Add</button>
                            <button
                              id="add-tag-cancel"
                              className="cancel-chip"
                              onClick={this.renderTagInput}
                            >&times;</button>
                          </div>
                        </div>
    const folderChips = <ul className="folder-chips-ul">
                        {(this.props.reduxFolders) 
                          ? this.props.reduxFolders.map(folder => {
                              return (<li key={folder} className="folder-chips-li">
                                      {folder}
                                      <button 
                                        onClick={(e) => this.removeFolder(e)}
                                        className="folder-chip-remove"
                                        value={folder}
                                      >&times;</button>
                                    </li>
                                  )}) 
                          : null}
                      </ul> 
    const addFolderInput = <div className="edit-add-folder-input-container">
                            {/* <label>Add folders:</label> */}
                            <input 
                              id="add-folder"
                              className="atic-edit-notes-folders-input"
                              type="text"
                              placeholder="Add a folder..."
                              onChange={this.handleAddFolder}
                            />
                            <div className="add-folder-input-buttons">
                              <button
                                onClick={this.addFolder}
                                className="add-chip"
                                value={this.props.folderValue}
                              >Add</button>
                              <button
                              id="add-folder-cancel"
                              className="cancel-chip"
                              onClick={this.renderFolderInput}
                            >&times;</button>
                            </div>
                          </div>


    return(
      <div className="edit-note-form-container">
        {/* <h4>Edit Note</h4> */}
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
              defaultValue={this.state.editedValues.content}
              placeholder={this.state.editedValues.content}
              type="text"
              rows="16" cols="50"
              onChange={e => this.handleContentValueChange(e)}
            />  
          </label>
          <div className="edit-tags-container">
            {(this.props.renderTagInput) 
              ? null 
              : <button name="add-tags" onClick={this.renderTagInput} className="toggle-tag-input-button">+ Add tags</button>}
            {(!this.props.renderTagInput)
              ? tagChips
              : addTagInput}
          </div>

          <div className="edit-folders-container"> 
            {(this.props.renderFolderInput)
              ? null 
              : <button name="add-folders" onClick={this.renderFolderInput} className="toggle-folder-input-button">+ Add folders</button>}
            {(!this.props.renderFolderInput)
              ? folderChips
              : addFolderInput}
          </div>
          <div className="edit-note-form-buttons-container">
            <button type="submit" className="sc">Save Changes</button>
            <button onClick={this.cancelEdit} className="cancel">Cancel</button>
          </div>
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
  folders: state.folders.data,
  reduxTags: state.editNote.tags,
  reduxFolders: state.editNote.folders,
  renderTagInput: state.editNote.renderTagInput,
  renderFolderInput: state.editNote.renderFolderInput,
  titleValue: state.editNote.titleValue,
  contentValue: state.editNote.contentValue,
  tagValue: state.editNote.tagValue,
  folderValue: state.editNote.folderValue
});

export default connect(mapStateToProps)(EditNoteForm);