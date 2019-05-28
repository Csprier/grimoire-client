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
    this.makeNewTagsArray = this.makeNewTagsArray.bind(this);
    this.makeNewFolderArray = this.makeNewFolderArray.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleTitleChange = e => {
    this.setState({
      titleValue: e.target.value
    });
  }

  handleContentChange = e => {
    this.setState({
      contentValue: e.target.value
    });
  }

  handleTagChange = e => {
    this.setState({
      tagValue: e.target.value
    });
  }

  handleFolderChange = e => {
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
    console.log('Make tagArray', tagArray);
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
    console.log(newNote);
    this.props.dispatch(addNewNote(newNote));
    this.props.history.push('/dashboard'); 
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

          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={this.cancelNote}></button>
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
