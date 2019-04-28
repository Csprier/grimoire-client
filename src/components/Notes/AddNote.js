import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';

// Components
import AddTagsToNotes from './AddTagsToNotes';

// HOC
import RequiresLogin from '../requires-login';

// ../Field/
import renderField from '../Field/renderField';
import renderTextarea from '../Field/renderTextarea';

// Actions
import { addNewNote } from '../../actions/notes.actions';
import { addNewTag, getTags } from '../../actions/tags.actions';

// CSS
import '../css/notes/add-note.css';

class AddNote extends Component {
  constructor() {
    super();
    this.state = {
      tagsToBeAdded: []
    }
  }

  getSelectedTags = (tags) => {
    this.setState({
      tagsToBeAdded: tags
    });
  };

  cancelNote = () => {
    this.props.history.push('/dashboard');
  }
  backToDashboard = () => {
    this.props.history.push('/dashboard');
  }


  handleAddNoteSubmit = (e) => {
    let userId = this.props.user.id,
        title = e.title,
        content = e.content,
        // folderId = e.folderId || '',
        tags = this.state.tagsToBeAdded;

    let existingTags = this.props.tags;
    let newTags = {};
    let tagArray = [];
    
    // Loop over tagsToBeAdded
    // create key/value pairs inside newTags where the key is the tag name, 
    // and the key's values are objects with a name: "tag name", and userId to be passed to the async action
    tags.forEach(tag => {
      newTags[tag] = { 
        name: tag, 
        userId 
      }
    }); 

    // Loop over existing tags
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

    // addNewTag(userId, tagArray)
    this.props.dispatch(addNewTag(userId, Object.keys(newTags)))
      .then((res) => {
        let updatedNewTags = res.newTags.map(tag => {
          return {
            name: tag.name,
            id: tag._id
          }
        })
        
        tagArray = [ ...tagArray, ...updatedNewTags ].map(tag => {
          return { _id: tag.id }
        });

        let newNote = { 
          userId, 
          title, 
          content, 
          // folderId,
          tags: tagArray
        };
        console.log('nn', newNote);
        this.props.dispatch(addNewNote(newNote));
        this.props.history.push('/dashboard');
      })

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
  error: state.notes.error
});

AddNote = reduxForm({
  form: 'AddNote'
})(AddNote);

export default RequiresLogin()(connect(mapStateToProps)(AddNote));