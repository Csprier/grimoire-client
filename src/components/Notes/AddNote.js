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

  cancelNote = () => {
    this.props.history.push('/dashboard');
  };
  backToDashboard = () => {
    this.props.history.push('/dashboard');
  };

  makeNewTagsArray = (tags, userId) => {
    let existingTags = this.props.tags; // array of objects: [ { name: String, id: String, ObjectId(mongoose) } ]
    let newTags = {};
    let tagArray = [];

    tags.forEach(tag => {
      newTags[tag] = {
        name: tag,
        userId
      }
    });

    existingTags.forEach(existingTag => {
      if (newTags[existingTag.name]) {
        let temp = newTags[existingTag.name];

        delete newTags[existingTag.name];

        if (existingTag.name === temp.name) {
          tagArray.push(existingTag);
        }
      }
    });

    for (let key in newTags) {
      tagArray.push(newTags[key]);
    }

    return tagArray;
  };

  makeNewFolderArray = (folders, userId) => {
    let existingFolders = this.props.folders;
    let newFolders = {};
    let folderArray = [];

    folders.forEach(folder => {
      newFolders[folder] = { 
        name: folder, 
        userId 
      }
    }); 

    existingFolders.forEach(existingFolder => {
      if (newFolders[existingFolder.name]) {
        let temp = newFolders[existingFolder.name];

        delete newFolders[existingFolder.name];

        if (existingFolder.name === temp.name) {
          folderArray.push(existingFolder);
        }
      }
    });

    for (let key in newFolders) {
      folderArray.push(newFolders[key]);
    }

    return folderArray;
  };

  handleAddNoteSubmit = (input) => {
    let userId = this.props.user.id;
    let tagsForNote = this.makeNewTagsArray(this.props.createNote.tags, userId);
    let foldersForNote = this.makeNewFolderArray(this.props.createNote.folders, userId);
    let newNote = {
      title: input.title,
      content: input.content,
      tags: tagsForNote,
      folders: foldersForNote
    }
    console.log(newNote);
    // this.props.dispatch(addNewNote(newNote));
    // this.props.history.push('/dashboard'); 
  };

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

          <AddTagsToNotes />
          <AddFoldersToNotes />

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
  createNote: state.createNote,
  error: state.notes.error
});

AddNote = reduxForm({
  form: 'AddNote'
})(AddNote);

export default RequiresLogin()(connect(mapStateToProps)(AddNote));