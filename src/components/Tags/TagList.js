import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

// Async Actions
import { getTags, toggleAddTagInputRender } from '../../actions/tags.actions'

// Components
import Tag from './Tag';
// import AddTag from '../Tags/AddTag';
import AddTagInput from '../Tags/AddTagInput';

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

  toggleRenderTagInput = () => {
    this.props.dispatch(toggleAddTagInputRender());
  }

  render() {
    return (
      <div className="tag-list-container">
        <div className="tag-list-nav">
          <h4>List of Tags</h4>
          <button 
            onClick={this.returnToDashboard}
          >&#60; Dashboard</button>
        </div>
        <div className="tag-list">
          { (this.props.tags !== undefined)
            ? this.props.tags.map((tag, i) => <Tag tag={tag} key={i} />)
            : <span>No tags in the database</span>
          }
        </div>
        <div className="tag-list-input-container">
          {(this.props.renderAddTagInput)
            ? <AddTagInput />
            : <button
                className="render-add-tag-input-button"
                onClick={this.toggleRenderTagInput}
              >+ New Tag</button>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  tags: state.tags.data || [],
  renderAddTagInput: state.tags.renderAddTagInput
});

export default RequiresLogin()(connect(mapStateToProps)(TagList));