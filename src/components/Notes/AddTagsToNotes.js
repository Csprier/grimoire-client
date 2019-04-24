import React, { Component } from 'react';
import { connect } from 'react-redux';

// CSS
// import '../css/notes/add-tags-to-notes.css';

class AddTagsToNotes extends Component {
  render() {
    return (
      <div className="add-tags-to-notes-container">

      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data
})

export default connect(mapStateToProps)(AddTagsToNotes);