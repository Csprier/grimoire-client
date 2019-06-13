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
  renderFolderInputAction
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
      // renderTagInput: false,
      // renderFolderInput: false,
      newContentValue: '',
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

  // When EditNoteForm mounts, dispatch an async action to get the note's property values
  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(getNoteByIdToEdit(this.props.noteToEdit))
      .then((res) => {
        console.log('ENFCDMres', res);
        let noteValues = res;
        this.updateNoteValuesInComponentState(noteValues);
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  // Update values in state to represent what goes into the note to be edited
  updateNoteValuesInComponentState = (note) => {
    console.log('updateNoteValuesInComponentState', note);
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
    this.setState = ({
      editedValues: {
        title: e.target.value
      }
    });
  }
  handleContentValueChange = (e) => {
    e.preventDefault();
    this.setState = ({
      newContentValue: e.target.value
    });
  }

  // set state values to conditionally render input elements to add tags/folders
  renderTagInput = (e) => {
    e.preventDefault();
    this.props.dispatch(renderTagInputAction());
    // this.setState({
    //   renderTagInput: true
    // });
  }
  renderFolderInput = (e) => {
    e.preventDefault();
    this.props.dispatch(renderFolderInputAction());
    // this.setState({
    //   renderFolderInput: true
    // });
  }

  // Add chips
  handleAddTag = (e) => {
    // e.preventDefault();
    this.setState({
      newTagValue: e.target.value
    });
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

  handleAddFolder = (e) => {
    e.preventDefault();
    this.setState({
      newFolderValue: e.target.value
    });
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
    let userId = this.props.user.id,
        id = this.state.editNote.id,
        title = e.target.elements.editTitle.value,
        content = (e.target.elements.editContent.value === '') ? e.target.elements.editContent.value : this.state.editNote.content;

    let formattedTags = utility.makeNewTagsArray(this.props.reduxTags, this.props.tags, userId),
        formattedFolders = utility.makeNewFolderArray(this.props.reduxFolders, this.props.folders, userId);

    let updatedNote = {
      userId,
      id,
      title,
      content,
      tags: formattedTags,
      folders: formattedFolders
    }
    console.log('Sending updated note to the server: ', updatedNote)
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

    const tagChips = <ul>
                      {(this.props.reduxTags) 
                        ? this.props.reduxTags.map(tag => {
                            return (<li key={tag}>
                                      {tag}
                                      <button 
                                        onClick={(e) => this.removeTag(e)}
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
                        {(this.props.reduxFolders) 
                          ? this.props.reduxFolders.map(folder => {
                              return (<li key={folder}>
                                      {folder}
                                      <button 
                                        onClick={(e) => this.removeFolder(e)}
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
              defaultValue={this.state.editedValues.content}
              placeholder={this.state.editedValues.content}
              type="text"
              rows="4" cols="50"
              onChange={e => this.handleContentValueChange(e)}
            />  
          </label>
          <div className="edit-tags-container">
            {(this.props.renderTagInput) 
              ? null 
              : <button name="add-tags" onClick={this.renderTagInput}>Add tags</button>}
            {(!this.props.renderTagInput)
              ? tagChips
              : addTagInput}
          </div>

          <div className="edit-folders-container"> 
            {(this.props.renderFolderInput)
              ? null 
              : <button name="add-folders" onClick={this.renderFolderInput}>Add folders</button>}
            {(!this.props.renderFolderInput)
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
  folders: state.folders.data,
  reduxTags: state.editNote.tags,
  reduxFolders: state.editNote.folders,
  renderTagInput: state.editNote.renderTagInput,
  renderFolderInput: state.editNote.renderFolderInput,
});

export default connect(mapStateToProps)(EditNoteForm);