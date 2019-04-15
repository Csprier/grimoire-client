import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
import '../css/tags/tag.css';

class Tag extends Component {
  handleDeleteFromNote = (e) => {
    let tagId = e.target.value,
        noteId = this.props.noteId;
    console.log(`Delete: ${tagId}, from note ${noteId}`);
  }

  render() {
    return (
      <li className="tag" key={this.props.tag._id}>
        <p>{this.props.tag.name}</p>
        <button
          className="tag-delete-button"
          onClick={this.handleDeleteFromNote}
          value={this.props.tag._id}
        >X</button>
      </li>
    )
  }
}

export default connect()(Tag);