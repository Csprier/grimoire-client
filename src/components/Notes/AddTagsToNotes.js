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

  render() {
    console.log(this.state.value);
    return (
      <div className="add-tags-to-notes-container">

        <React.Fragment>
          {this.state.selectedTags.map(tag => <div key={tag}>{tag}</div>)}
          
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
        </React.Fragment>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data
})

export default connect(mapStateToProps)(AddTagsToNotes);