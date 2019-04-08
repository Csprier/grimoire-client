import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import RequiresLogin from '../requires-login';
// ../Field/
import renderField from '../Field/renderField';
import renderTextarea from '../Field/renderTextarea';

// Actions
import { addNote } from '../../actions/notes.actions';

class AddNote extends Component {
  cancelNote = () => {
    this.props.history.push('/dashboard');
  }

  handleAddNoteSubmit = (e) => {
    let userId = this.props.user.id,
        title = e.title,
        content = e.content;
    this.props.dispatch(addNote(title, content, userId));
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
        <h2>Add Note</h2>
        <form onSubmit={this.props.handleSubmit((e) => {
            this.handleAddNoteSubmit(e);
          })} ref="form">
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
          <button type="submit" label="submit">Save</button>
          <button type="button" onClick={this.cancelNote} label="cancel">Cancel</button>
        </form>
        {error}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  notes: state.notes.data,
  error: state.notes.error
});

AddNote = reduxForm({
  form: 'AddNote'
})(AddNote);

export default RequiresLogin()(connect(mapStateToProps)(AddNote));