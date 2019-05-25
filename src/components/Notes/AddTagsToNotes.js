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
      selectedTags: [],
      value: ''
    }
  }

  // CHIPS ========================================
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  
  handleDelete = (tagToRemove) => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(tag => tag !== tagToRemove)
    });
  }

  /**
   * @description Adds selectedTags to state and resets state.value to an empty string
   * @param {event} e - 
   */
  addToSelectedTags = (e) => {
    let tag = e.target.value;
    this.setState({
      selectedTags: [ ...this.state.selectedTags, tag ],
      value: ''
    });
  }

  render() {
    return (
      <div className="add-tags-to-notes-container">
        <div className="selected-tags-container">
          {this.state.selectedTags.map(tag => {
            return (
              <div key={tag} className="tag-chip">
                <span className="chip-name">{tag}</span>
                <span
                  onClick={() => {
                    this.handleDelete(tag);
                    this.props.dispatch(removeTagFromNewNote(tag));
                  }}
                  className="chip-remove"
                >
                  &times;
                </span>
              </div>
              )
            })
          }
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
              this.addToSelectedTags(e);
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
  tags: state.tags.data
});

export default connect(mapStateToProps)(AddTagsToNotes);