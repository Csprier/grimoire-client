import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

class AddTagInput extends Component {
  constructor() {
    super();
    this.state = {
      tagValue: '',
      tagsToAddToDatabase: []
    }
    this.handleTagValueChange = this.handleTagValueChange.bind(this);
    this.makeNewTagsArray = this.makeNewTagsArray.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeChip = this.removeChip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTagValueChange = e => {
    this.setState({
      tagValue: e.target.value
    });
  }

  makeNewTagsArray = (tags, userId) => {
    let existingTags = this.props.tags; // array of objects: [ { name: String, id: String, ObjectId(mongoose) } ]
    let newTags = {};
    let tagArray = [];

    tags.forEach(tag => {
      newTags[tag] = {
        name: tag,
        userId
      }
    });

    existingTags.forEach(existingTag => {
      if (newTags[existingTag.name]) {
        let temp = newTags[existingTag.name];

        delete newTags[existingTag.name];

        if (existingTag.name === temp.name) {
          tagArray.push(existingTag);
        }
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
    console.log('HandleClick e', e);
    this.setState({
      tagsToAddToDatabase: [ ...this.state.tagsToAddToDatabase, e.target.value ]
    });
  }

  removeChip = tag => {
    console.log('Remove tag: ', tag);
    let tagToRemove = tag;
    this.setState({
      tagsToAddToDatabase: this.state.tagsToAddToDatabase.filter(tag => tag !== tagToRemove)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('e', e)
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Add a Tag:
              <input 
                id="createATagInput"
                type="text"
                placeholder="Add a tag"
                onChange={this.handleTagValueChange}
                value={this.state.tagValue}
              />
            </label>
            <button
              value={this.state.tagValue}
              onClick={(e) => {
                e.preventDefault();
                this.handleClick(e);
              }}
            >Add Chip</button>
            <button
              id="addTagInputSubmit"
              type="submit"
            >Add Tags</button>
          </form>
        </div>
        <div>
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
      </div>
    )
  }
}

export default RequiresLogin()(connect()(AddTagInput));