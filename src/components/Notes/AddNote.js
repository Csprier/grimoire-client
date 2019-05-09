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
import { addNewNote, tagsToNewNote, foldersToNewNote } from '../../actions/notes.actions';
// import { addNewTag } from '../../actions/tags.actions';
// import { addNewFolder } from '../../actions/folders.actions';

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
  componentDidUpdate(prevState) {
    let userId = this.props.user.id,
        foldersThatNeedToBeMade = this.state.foldersToBeAdded,
        tagsThatNeedToBeMade = this.state.tagsToBeAdded;

    console.log('folders', foldersThatNeedToBeMade);
    console.log('tags', tagsThatNeedToBeMade);
    // Create the map objects for tags and folders whenever the component updates
    let tagArray = this.makeNewTagsArray(tagsThatNeedToBeMade, userId)
    let folderArray = this.makeNewFolderArray(foldersThatNeedToBeMade, userId)
    console.log('Tag Array', tagArray);
    console.log('Folder Array', folderArray);

    // this.props.dispatch(tagsToNewNote(tagArray.tagArray));  
    // this.props.dispatch(foldersToNewNote(folderArray.folderArray));
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
  };
  backToDashboard = () => {
    this.props.history.push('/dashboard');
  };

  makeNewTagsArray = (tags, userId) => {
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
        let temp = newTags[existingTag.name]; // capture the existing tag
        delete newTags[existingTag.name]; // delete the existing tag from newTags

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

  handleAddNoteSubmit = (e) => {
    // let tagMap = 
    // let folderMap = 
    
    // let foldersThatNeedToBeMade = folderMap.newFolders,
    //     foldersToBeSent = [],
    //     tagsThatNeedToBeMade = tagMap.newTags,
    //     tagsToBeSent = [];

    // if (folderMap !== undefined) {
    //   for (let key in foldersThatNeedToBeMade) {
    //     console.log('fk', key);
    //     // foldersToBeSent.push(foldersThatNeedToBeMade[key]);
    //   }
    // }
    // if (tagMap !== undefined) {
    //   for (let key in tagsThatNeedToBeMade) {
    //     console.log('tk', key);
    //     // tagsToBeSent.push(tagsThatNeedToBeMade[key]);
    //   }
    // }

    // console.log('T', tagsToBeSent);
    // console.log('F', foldersToBeSent);
    // let newNote = {
    //   userId: this.props.user.id,
    //   title: e.title,
    //   content: e.content,
    //   folders: 
    //   tags: 
    // };
    // console.log('Note to be made: ', newNote);
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