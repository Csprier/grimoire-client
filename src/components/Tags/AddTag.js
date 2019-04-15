import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import RequiresLogin from '../requires-login';

// ../Field/
import renderField from '../Field/renderField';

// Actions
import { addNewTagToNote } from '../../actions/tags.actions';

// CSS
import '../css/tags/add-tag.css';

class AddTag extends Component {
  handleAddTagToNoteSubmit = (e) => {
    let userId = this.props.user.id,
        noteId = this.props.noteId,
        newTag = e["add-tag"];

    console.log(`Add tag "${newTag}" to user ${userId}.`);
    this.props.dispatch(addNewTagToNote(userId, noteId, newTag));
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
      <div className="add-tag-form-container">
        <p>NoteId: {this.props.noteId}</p>
        <form onSubmit={this.props.handleSubmit((e) => {
          this.handleAddTagToNoteSubmit(e);
        })} ref="form" className="add-tag-form">
          <Field 
            name="add-tag"
            component={renderField}
            value={this.props.values}
            type="text"
            placeholder="Add a tag to this note..."
          />
          <button type="submit">Add</button>
        </form>
        {error}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

AddTag = reduxForm({
  form: 'AddTag'
})(AddTag);

export default RequiresLogin()(connect(mapStateToProps)(AddTag));