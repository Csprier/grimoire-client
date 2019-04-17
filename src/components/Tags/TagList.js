import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions
import { getTags, deleteTagFromDatabase } from '../../actions/tags.actions'

// Components
// import Tag from './Tag';
import AddTag from '../Tags/AddTag';


class TagList extends Component {
  componentDidMount() {
    console.log('TagList mounted, fetching tags.');
    this.props.dispatch(getTags());
  }

  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  handleDeleteTag = (e) => {
    let tagId = e.target.value,
        userId = this.props.userId;
    console.log(`Delete: ${tagId} from database. UserId: ${userId}`);
    this.props.dispatch(deleteTagFromDatabase(userId, tagId))
  }

  render() {
    return (
      <div className="tag-list-container">
        <h1>List of Tags</h1>
        <button onClick={this.returnToDashboard}>Back to Dashboard</button>
        <AddTag />
        { (this.props.tags !== undefined)
          ? this.props.tags.map(tag => {
              return (
                <div className="tag" key={tag.id}>
                  <p>{tag.name}</p>
                  <button
                    className="tag-delete-button"
                    onClick={this.handleDeleteTag}
                    value={tag.id}
                  >X</button>
                </div>)})
          : this.props.tags.map(tag => <p>{tag.name}</p>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  tags: state.tags.data
});

export default RequiresLogin()(connect(mapStateToProps)(TagList));