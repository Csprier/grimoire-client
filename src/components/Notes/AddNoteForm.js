import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Actions
import { addNewNote } from '../../actions/notes.actions';
import { 
  addTagToNewNote, 
  removeTagFromNewNote, 
  addFolderToNewNote, 
  removeFolderFromNewNote 
} from '../../actions/createNote.actions';

// CSS
import '../css/notes/add-note.css';
import '../css/notes/add-tags-to-notes.css';
import '../css/notes/add-folders-to-notes.css';

class AddNoteForm extends Component {
  constructor() {
    super();
    this.state = {
      titleValue: '',
      contentValue: '',
      tagValue: '',
      folderValue: ''
    }
  }

  cancelNote = () => {
    this.setState({
      titleValue: '',
      contentValue: '',
      tagValue: '',
      folderValue: ''
    });
    this.props.history.push('/dashboard');
  };

  handleTitleChange = (e) => {
    this.setState({
      titleValue: e.target.value
    });
  }

  handleContentChange = (e) => {
    this.setState({
      contentValue: e.target.value
    });
  }

  handleTagChange = (e) => {
    this.setState({
      tagValue: e.target.value
    });
  }

  handleFolderChange = (e) => {
    this.setState({
      folderValue: e.target.value
    });
  }

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

    let finalizedTags = tagArray.map((tag) => {
      if (tag.id) {
        let formattedTag = {
          _id: tag.id,
          name: tag.name
        }
        return formattedTag;
      } else {
        return tag;
      }
    });
    return finalizedTags;
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

    let finalizedFolders = folderArray.map((folder) => {
      if (folder.id) {
        let formattedFolder = {
          _id: folder.id,
          name: folder.name
        }
        return formattedFolder;
      } else {
        return folder;
      }
    });
    return finalizedFolders;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let userId = this.props.user.id;
    let tagsForNote = this.makeNewTagsArray(this.props.createNote.tags, userId);
    let foldersForNote = this.makeNewFolderArray(this.props.createNote.folders, userId);
  
    let newNote = {
      title: this.state.titleValue,
      content: this.state.contentValue,
      tags: tagsForNote,
      folders: foldersForNote
    }
    this.props.dispatch(addNewNote(newNote));
    this.props.history.push('/dashboard'); 
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
        <form className="add-note-form" onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input 
              type="text" 
              className="an-input"
              placeholder="Title..."
              onChange={this.handleTitleChange} 
            />
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

          <div className="add-tags-to-notes-container">
            <div className="an-add-tag-input-container">
              <input 
                id="tagsForNote"
                type="text"
                placeholder="Add a tag..."
                onChange={this.handleTagChange}
                className="an-input"
              />
              <button
                value={this.state.tagValue}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.dispatch(addTagToNewNote(e.target.value))
                  document.getElementById('tagsForNote').value = "";
                }}
                className="an-add-tag-button"
              >+ Add Tag</button>
            </div>
            <div className="tag-chips-container">
              {this.props.createNote.tags.map(tag => {
                return (
                  <div key={tag} className="tag-chip">
                    <span>{tag}</span>
                    <span
                      onClick={() => {
                        this.props.dispatch(removeTagFromNewNote(tag));
                      }}
                      className="chip-remove"
                    >
                      &times;
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="add-folders-to-notes-container">
            <div className="an-add-folder-input-container">
              <input 
                id="folderssForNote"
                type="text"
                placeholder="Add a folder..."
                onChange={this.handleFolderChange}
                className="an-input"
              />
              <button
                value={this.state.folderValue}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.dispatch(addFolderToNewNote(e.target.value))
                  document.getElementById('folderssForNote').value = "";
                }}
                className="an-add-folder-button"
              >+ Add Folder</button>
            </div>
            <div className="folder-chips-container">
              {this.props.createNote.folders.map(folder => {
                return (
                  <div key={folder} className="folder-chip">
                    <span>{folder}</span>
                    <span
                      onClick={() => {
                        this.props.dispatch(removeFolderFromNewNote(folder));
                      }}
                      className="chip-remove"
                    >
                      &times;
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="add-note-buttons">
            <button type="submit" className="an-sc">Save</button>
            <button onClick={this.cancelNote} className="an-cancel">Cancel</button>
          </div>
        </form>
        {error}
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
