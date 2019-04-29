import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field
} from 'redux-form';

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
  componentDidUpdate = () => {
    if (this.state.selectedTags.length !== 0) {
      let updatedTags = this.state.selectedTags;
      this.props.getTagData(updatedTags);
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

  // ADD TAG TO CHIPS ========================================
  addToSelectedTags = (e) => {
    let tag = e.target.value;
    this.setState({
      selectedTags: [ ...this.state.selectedTags, tag ],
      value: ''
    });
    console.log('selectedTags after =>', this.state.selectedTags);
  }

  render() {
    return (
      <div className="add-tags-to-notes-container">
        <div className="selected-tags-container">
          {/* {this.state.selectedTags.map(tag => {
            return (
              <div key={tag.id} className="tag-chip">
                <span className="chip-name">{tag.name}</span>
                <span
                  onClick={() => this.handleDelete(tag.name)}
                  className="chip-remove"
                >
                  &times;
                </span>
              </div>
              )
            })
          } */}
        </div>
          
        <div className="add-tag-input-container">
          <Field 
            name="tags-for-note"
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
            // value={this.state.value} 
            onClick={(e) => this.addToSelectedTags(e)}
            className="add-tag-button"
          >
            Add Tag
          </button>
        </div>
      
        {/* <div className="drop-down-container">
          { (this.state.value) 
              ? this.props.tags.map(tag => {
                  let regex = new RegExp(`${this.state.value}`);
                  if (tag.name.match(regex)) {
                    return (
                      <div className="dropdown-item"
                        key={tag.id}
                        onClick={() => this.addToSelectedTags(tag)}  
                      >{tag.name}</div>
                    )
                  }
                return null;
              })
            : null }
        </div> */}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data
});

export default connect(mapStateToProps)(AddTagsToNotes);