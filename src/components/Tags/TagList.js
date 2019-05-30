import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions
import { getTags } from '../../actions/tags.actions'

// Components
import Tag from './Tag';
import AddTag from '../Tags/AddTag';

// CSS
import '../css/tags/tag-list.css';


class TagList extends Component {
  componentDidMount() {
    console.log('TagList mounted, fetching tags.');
    this.props.dispatch(getTags());
  }

  returnToDashboard = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="tag-list-container">
        <div className="tag-list-nav">
          <h4>List of Tags</h4>
          <button onClick={this.returnToDashboard}>&#60; Dashboard</button>
        </div>
        <AddTag />
        <div className="tag-list">
          { (this.props.tags !== undefined)
            ? this.props.tags.map((tag, i) => <Tag tag={tag} key={i} />)
            : <span>No tags in the database</span>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  tags: state.tags.data || []
});

export default RequiresLogin()(connect(mapStateToProps)(TagList));