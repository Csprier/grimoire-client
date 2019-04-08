import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import renderField from '../Field/renderField';
import renderTextarea from '../Field/renderTextarea';

class AddNote extends Component {
  render() {
    return (
      <div className="add-note-container">
        <h2>Add Note</h2>
        <form ref="form">
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
            // cols={40}
            // rows={10}
          />
          <button type="submit" label="submit">Save</button>
        </form>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  notes: state.notes.data
});

AddNote = reduxForm({
  form: 'AddNote'
})(AddNote);

export default connect(mapStateToProps)(AddNote);