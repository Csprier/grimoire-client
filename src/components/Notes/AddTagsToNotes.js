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
    // this.clearText = this.clearText.bind(this);
  }

  // componentDidUpdate() {
  //   console.log(document.getElementById('tagsForNote'));
  // }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  // clearText = () => {
  //   console.log('clearText', document.getElementById('tagsForNote'));
  //   console.log(this.state);
  //   document.getElementById('tagsForNote').value = "";
  //   this.setState({
  //     value: ''
  //   });
  //   console.log(this.state);
  // }

  render() {
    console.log('State.value:', this.state.value);
    // console.log('tags and shit', this.props.tagsForNote);
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
            id="tagsForNote"
            name="tagsForNote"
            type="text" 
            component="input"
            ref="tag"
            placeholder="Add a tag..."
            onChange={e => {
              this.handleChange(e);
            }}
            className="search-or-add-tag-input"
          />
          <button 
            value={this.state.value} 
            onClick={(e) => {
              e.preventDefault();
              this.props.dispatch(addTagToNewNote(e.target.value));
              setTimeout(() => {
                this.setState({
                  value: ''
                })
                document.getElementById('tagsForNote').value = "";
              }, 0);
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