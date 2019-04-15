import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import '../css/tag.css';

class Tag extends Component {
  handleDelete = (e) => {
    let tagId = e.target.value;
    console.log(`Deleting: ${tagId}`);
    // this.props.dispatch(deleteTagById(tagId));
  }

  render() {
    return (
      <li className="tag" key={this.props.tag._id}>
        <p>{this.props.tag.name}</p>
        <button
          className="tag-delete-button"
          onClick={this.handleDelete}
          value={this.props.tag._id}
        >X</button>
      </li>
    )
  }
}

export default connect()(Tag);