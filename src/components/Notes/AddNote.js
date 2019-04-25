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
import { addNewTag } from '../../actions/tags.actions';

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
    })
  }

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
        tags = this.state.tagsToBeAdded,
        finalizedTags = [];
    let existingTags = this.props.tags;

    existingTags.forEach(existingTag => {
      for (let i = 0; i < tags.length; i++) {
        if (tags[i] === existingTag.name) { // if the tags are the same
          finalizedTags.push(existingTag);
        }

        if (tags[i] !== existingTag.name) {
          this.props.dispatch(addNewTag(userId, tags[i]))
            .then(() => {
              for (let i = 0; i < existingTags.length; i++) {
                if (existingTags[i].name === tags[i]) {
                  finalizedTags.push(existingTags[i]);
                }
              }
            })
        }
      }
    });

    let newNote = { 
      userId, 
      title, 
      content, 
      tags: finalizedTags 
    };
    console.log('nn', newNote);
    
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