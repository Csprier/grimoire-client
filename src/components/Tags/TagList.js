import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions
import { getTags } from '../../actions/tags.actions'

// Components
import Tag from './Tag';

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
        <h1>List of Tags</h1>
        <button onClick={this.returnToDashboard}>Back to Dashboard</button>
        {this.props.tags.map((tag, i) => <Tag tag={tag} key={i} />)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.tags.data
});

export default RequiresLogin()(connect(mapStateToProps)(TagList));