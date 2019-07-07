import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Actions
import { addNewTag, toggleAddTagInputRender } from '../../actions/tags.actions';

// CSS
import '../css/tags/add-tag.css';

class AddTagInput extends Component {
  constructor() {
    super();
    this.state = {
      tagValue: '',
      tagsToAddToDatabase: []
    }
  }

  handleTagValueChange = e => {
    this.setState({
      tagValue: e.target.value
    });
  }

  makeNewTagsArray = (tags, userId) => {
    let newTags = {};
    let tagArray = [];

    tags.forEach(tag => {
      newTags[tag] = {
        name: tag,
        userId
      }
    });

    for (let key in newTags) {
      tagArray.push(newTags[key]);
    }

    let finalizedTags = tagArray.map((tag) => {
      if (tag.id) {
        let formattedTag = {
          _id: tag.id,
          name: tag.name
        }
        return formattedTag;
      } else {
        return tag;
      }
    });
    return finalizedTags;
  };

  handleClick = e => {
    let tagToAdd = e.target.value;
    this.setState({
      tagValue: '',
      tagsToAddToDatabase: [ ...this.state.tagsToAddToDatabase, tagToAdd ]
    });
  }

  removeChip = tag => {
    let tagToRemove = tag;
    this.setState({
      tagsToAddToDatabase: this.state.tagsToAddToDatabase.filter(tag => tag !== tagToRemove)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let userId = this.props.user.id;
    let tagsToBeSubmitted = this.makeNewTagsArray(this.state.tagsToAddToDatabase, userId);
    this.props.dispatch(addNewTag(tagsToBeSubmitted))
      .then(() => {
        this.setState({
          tagValue: '',
          tagsToAddToDatabase: []
        })
      })
      .catch(e => console.error('HANDLE SUBMIT ERROR', e));
  }

  render() {
    return (
      <div className="add-tag-input-component-container">
        <div className="add-tag-form-container">
          <form 
            className="add-tag-form"
            onSubmit={this.handleSubmit}
          >
            <input 
              id="createATagInput"
              type="text"
              placeholder="Add a tag"
              onChange={this.handleTagValueChange}
              value={this.state.tagValue}
              className="add-tag-form-input"
            />
            <div className="add-tag-chip-container">
              {this.state.tagsToAddToDatabase.map(tag => {
                return (
                  <div key={tag} className="add-tag-chip">
                    <span>{tag}</span>
                    <span
                      onClick={() => {
                        this.removeChip(tag)
                      }}
                      className="chip-remove"
                    >
                      &times;
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="add-tag-button-container">
              <button
                value={this.state.tagValue}
                onClick={(e) => {
                  e.preventDefault();
                  this.handleClick(e);
                  document.getElementById('createATagInput').value = "";
                }}
              >Add Chip</button>
              <button
                className="at-submit"
                id="addTagInputSubmit"
                type="submit"
              >&#43;</button>
              <button
                className="at-btn"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    tagValue: '',
                    tagsToAddToDatabase: []
                  });
                  this.props.dispatch(toggleAddTagInputRender());
                }}
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.tags.error
})

export default RequiresLogin()(connect(mapStateToProps)(AddTagInput));