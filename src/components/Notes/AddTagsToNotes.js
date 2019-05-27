import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field
} from 'redux-form';

import { addTagToNewNote, removeTagFromNewNote } from '../../actions/createNote.actions';

// CSS
import '../css/notes/add-tags-to-notes.css';

class AddTagsToNotes extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="add-tags-to-notes-container">
        <div className="selected-tags-container">
          {this.props.tagsForNote.map(tag => {
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
          
        <div className="add-tag-input-container">
          <Field 
            name="tagsForNote"
            placeholder="Search tags/Add tags..."
            type="text" 
            component="input"
            value={this.state.value}
            onChange={e => {
              this.handleChange(e);
            }}
            className="search-or-add-tag-input"
          />
          <button 
            value={this.state.value} 
            onClick={(e) => {
              e.preventDefault();
              this.props.dispatch(addTagToNewNote(e.target.value))
            }}
            className="add-tag-button"
          >
            Add Tag
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data,
  tagsForNote: state.createNote.tags
});

export default connect(mapStateToProps)(AddTagsToNotes);