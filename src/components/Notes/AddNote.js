import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';

// Components
import AddTagsToNotes from './AddTagsToNotes';
import AddFoldersToNotes from './AddFoldersToNotes';

// HOC
import RequiresLogin from '../requires-login';

// ../Field/
import renderField from '../Field/renderField';
import renderTextarea from '../Field/renderTextarea';

// Actions
import { addNewNote } from '../../actions/notes.actions';
import { addNewTag } from '../../actions/tags.actions';
import { addNewFolder } from '../../actions/folders.actions';

// CSS
import '../css/notes/add-note.css';

class AddNote extends Component {
  constructor() {
    super();
    this.state = {
      tagsToBeAdded: [],
      foldersToBeAdded: []
    }
  }

  // Get AddTagsToNotes data
  getSelectedTags = (tags) => {
    this.setState({
      tagsToBeAdded: tags
    });
  };
  // Get AddFoldersToNotes data
  getSelectedFolders = (folders) => {
    this.setState({
      foldersToBeAdded: folders
    });
  };

  cancelNote = () => {
    this.props.history.push('/dashboard');
  }
  backToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  createTags = (tags, userId) => {
    let existingTags = this.props.tags;
    let newTags = {};
    let tagArray = [];

    tags.forEach(tag => {
      newTags[tag] = { 
        name: tag, 
        userId 
      }
    }); 

    existingTags.forEach(existingTag => {
      // Check if the existence of existingTag.name 
      // is a key in the newTags object
      if (newTags[existingTag.name]) {
        let temp = newTags[existingTag.name];

        delete newTags[existingTag.name];

        // If we find that the existingTag.name is the same as newTags[existingTag].name
        // push it to tagArray, to be passed to the action
        if (existingTag.name === temp.name) {
          tagArray.push(existingTag);
        }
      } 
    });

    this.props.dispatch(addNewTag(userId, Object.keys(newTags)))
      .then((res) => {
        console.log(res);
        let updatedNewTags = res.newTags.map(tag => {
          return {
            name: tag.name,
            id: tag._id
          }
        })
      
      // Create an array of tag objects { _id: "String" }
      tagArray = [ ...tagArray, ...updatedNewTags ].map(tag => {
        return { _id: tag.id }
      });

      return tagArray;
    })
    .catch((err) => console.error(err));
  } // End createTags


  // CREATE FOLDERS
  createFolders = (folders, userId) => {
    let existingFolders = this.props.folders;
    let newFolders = {};
    let folderArray = [];

    folders.forEach(folder => {
      newFolders[folder] = { 
        name: folder, 
        userId 
      }
    }); 

    // Loop over existing tags
    existingFolders.forEach(existingFolder => {
      if (newFolders[existingFolder.name]) {
        let temp = newFolders[existingFolder.name];

        delete newFolders[existingFolder.name];

        if (existingFolder.name === temp.name) {
          folderArray.push(existingFolder);
        }
      }
    });

    this.props.dispatch(addNewFolder(userId, Object.keys(newFolders)))
      .then((res) => {
        console.log('res', res);
        let updatedNewFolders = res.newFolders.map(folder => {
          return {
            name: folder.name,
            id: folder._id
          }
        })
      
        // Create an array of folder objects { _id: "String" }
        folderArray = [ ...folderArray, ...updatedNewFolders ].map(folder => {
          return { _id: folder.id }
        });

      return folderArray;
    })
    .catch((err) => console.error(err));
  }



  handleAddNoteSubmit = (e) => {
    let userId = this.props.user.id,
        title = e.title,
        content = e.content,
        folders = this.state.foldersToBeAdded,
        tags = this.state.tagsToBeAdded;

    this.createTags(tags, userId)
      .then(() => this.createFolders(folders, userId))
      .then((res) => {
        console.log(res);
        let newNote = { userId, title, content, folders, tags };
        // this.props.dispatch(addNewNote(newNote));
        // this.props.history.push('/dashboard'); 
      });
  }

  render() {
    let { error } = this.props;
    if (error) {
      error = (
        <div className="note-error">
          <p>{this.props.error}</p>
        </div>
      )
    }

    return (
      <div className="add-note-container">
        <h4>Add Note</h4>
        <form onSubmit={this.props.handleSubmit((e) => {
            this.handleAddNoteSubmit(e);
          })} ref="form" className="add-note-form">
          <Field 
            name="title"
            component={renderField}
            value={this.props.values}
            type="text"
            placeholder="Add a title..."
            label="Add a title..."
          />
          <Field 
            name="content"
            component={renderTextarea}
            value={this.props.values}
            type="text"
            placeholder="Content..."
            label="Content..."
          />

          <AddTagsToNotes getTagData={this.getSelectedTags} />
          <AddFoldersToNotes getFolderData={this.getSelectedFolders} />

          <div className="add-note-buttons">
            <button type="submit" label="submit">Save</button>
            <button type="button" onClick={this.cancelNote} label="cancel">Cancel</button>
          </div>
        </form>
        {error}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  notes: state.notes.data || [],
  tags: state.tags.data,
  folders: state.folders.data,
  error: state.notes.error
});

AddNote = reduxForm({
  form: 'AddNote'
})(AddNote);

export default RequiresLogin()(connect(mapStateToProps)(AddNote));