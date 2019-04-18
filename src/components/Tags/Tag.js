import React, { Component } from 'react';
import { connect } from 'react-redux';

// Async Actions
import { deleteTagFromDatabase } from '../../actions/tags.actions';

// CSS
import '../css/tags/tag.css';

class Tag extends Component {
  handleDeleteTag = (e) => {
    let tagId = e.target.value,
        userId = this.props.userId;
    console.log(`Delete: ${tagId} from database. UserId: ${userId}`);
    this.props.dispatch(deleteTagFromDatabase(userId, tagId))
  }

  render() {
    return (
      <div className="tag" key={this.props.tag.id}>
        <p>{this.props.tag.name}</p>
        <button
          className="tag-delete-button"
          onClick={this.handleDeleteTag}
          value={this.props.tag.id}
        >X</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id
})

export default connect(mapStateToProps)(Tag);