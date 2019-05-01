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

  makeNewTagsMap = (tags, userId) => {
    let existingTags = this.props.tags; // array of objects: [ { name: String, id: String, ObjectId(mongoose) } ]
    let newTags = {};
    let tagArray = [];

    tags.forEach(tag => { // loop over argument
      newTags[tag] = {    // create key/value pairs inside newTags
        name: tag,        // "string": { name: "string", id: ObjectId }
        userId 
      }
    }); 

    existingTags.forEach(existingTag => {
      // Check if the existence of existingTag.name 
      // is a key in the newTags object
      if (newTags[existingTag.name]) {
        // If the tag exists inside newTags
        let temp = newTags[existingTag.name]; // capture the existing tag
        // delete the existing tag from newTags
        delete newTags[existingTag.name];

        // push temp to tagArray
        if (existingTag.name === temp.name) {
          tagArray.push(existingTag);
        }
      }
    });

    // return a map object { newTags: {}, tagArray: [] }
    return {
      newTags: newTags,
      tagArray: tagArray
    }
  } // End createTags

  // CREATE FOLDERS
  makeNewFolderMap = (folders, userId) => {
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

     // return a map object { newFolders: {}, folderArray: [] }
     return {
      newFolders: newFolders,
      folderArray: folderArray
    }
  }



  handleAddNoteSubmit = (e) => {
    let userId = this.props.user.id,
        title = e.title,
        content = e.content,
        foldersThatNeedToBeMade = this.state.foldersToBeAdded,
        foldersToSendWithNote = [],
        tagsThatNeedToBeMade = this.state.tagsToBeAdded,
        tagsToSendWithNote = [];

    let tagMap = this.makeNewTagsMap(tagsThatNeedToBeMade, userId)
    let folderMap = this.makeNewFolderMap(foldersThatNeedToBeMade, userId)
    // let newNote = this.createNoteToBeSent(userId, title, content, folders, tags)
    console.log('Tag Map', tagMap);
    console.log('Folder Map', folderMap);
    // this.props.dispatch(addNewTag(userId, Object.keys(tagMap.newTags)))
    // this.props.dispatch(addNewFolder(userId, Object.keys(folderMap.newFolders)))


        // Create an array of tag objects { _id: "String" }
        // tagsToSendWithNote = [ ...tagMap.tagArray, ... ].map(tag => {
        //   return { _id: tag.id }
        // });
        // console.log('Tags To Send With Note: ', tagsToSendWithNote);

        // Create an array of tag objects { _id: "String" }
        // tagsToSendWithNote = [ ...preExistingTags, ...updatedNewTags ].map(tag => {
        //   return { _id: tag.id }
        // });

        // console.log('Tags To Send With Note: ', tagsToSendWithNote);
    
    // this.props.dispatch(addNewFolder(userId, Object.keys(newFolders)))
    //     // Create an array of folder objects { _id: "String" }
    //     folderArray = [ ...folderArray, ...updatedNewFolders ].map(folder => {
    //       return { _id: folder.id }
    //     });


    // this.props.dispatch(addNewNote(newNote));
    // this.props.history.push('/dashboard'); 
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