import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      // Prevent default form behavior if any of the above keyboard keys were used, to remain on the current input instead of moving elsewhere
      e.preventDefault();
      // Get the value from our state
      let tag = this.state.value.trim(); 
      // if there is a tag(from the value), set the state to include the tag with es6 spread operator
      if (tag) { 
        this.setState({
          selectedTags: [ ...this.state.selectedTags, tag ],
          value: ''
        });
      }
    }
  };
  
  handleDelete = (tagToRemove) => {
    console.log(tagToRemove);
    this.setState({
      selectedTags: this.state.selectedTags.filter(tag => tag !== tagToRemove)
    });
  }
  // END CHIPS ========================================

  addToSelectedTags = (tag) => {
    console.log(`Adding ${tag.name} to selectedTags.`);
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
                onClick={() => this.handleDelete(tag)}
                className="chip-remove"
              >
                &times;
              </span>
            </div>)
        })}
        </div>
          
        <input 
          name="search or add tags"
          placeholder="Search tags/Add tags..."
          type="text" 
          value={this.state.value}
          onChange={e => {
            this.handleChange(e);
          }}
          onKeyDown={this.handleKeyDown}
        />
        
        {(this.state.value) 
          ? this.props.tags.map(tag => {
              let regex = new RegExp(`${this.state.value}`);
              if (tag.name.match(regex)) {
                return (
                  <div className="dropdown-item"
                    key={tag.id}
                    onClick={this.addToSelectedTags}  
                  >{tag.name}</div>
                )
              }
              return null;
            })
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data
})

export default connect(mapStateToProps)(AddTagsToNotes);