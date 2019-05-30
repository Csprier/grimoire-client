import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Actions
import { addNewTag } from '../../actions/tags.actions';

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
    console.log('Add Tag to component state:', tagToAdd);
    this.setState({
      tagValue: '',
      tagsToAddToDatabase: [ ...this.state.tagsToAddToDatabase, tagToAdd ]
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
    let userId = this.props.user.id;
    let tagsToBeSubmitted = this.makeNewTagsArray(this.state.tagsToAddToDatabase, userId);
    console.log('Tags To Be Submitted', tagsToBeSubmitted);
    this.props.dispatch(addNewTag(userId, tagsToBeSubmitted));
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
                document.getElementById('createATagInput').value = "";
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

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.tags.error
})

export default RequiresLogin()(connect(mapStateToProps)(AddTagInput));