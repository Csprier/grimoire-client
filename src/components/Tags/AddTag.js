import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import RequiresLogin from '../requires-login';

// ../Field/
import renderField from '../Field/renderField';

// Actions
import { addNewTag } from '../../actions/tags.actions';

// CSS
import '../css/tags/add-tag.css';

class AddTag extends Component {
  handleAddTagSubmit = (e) => {
    let userId = this.props.user.id,
        name = e["add-tag"];

    console.log(`Add tag "${name}" to user ${userId}.`);
    this.props.dispatch(addNewTag(userId, name));
  }

  render() {
    let { error } = this.props;
    if (error) {
      error = (
        <div className="note-error">
          <p>{this.props.error}</p>
        </div>
      )
    }

    return (
      <div className="add-tag-form-container">
        <form onSubmit={this.props.handleSubmit((e) => {
          this.handleAddTagSubmit(e);
        })} ref="form" className="add-tag-form">
          <Field 
            name="add-tag"
            component={renderField}
            value={this.props.values}
            type="text"
            placeholder="Add a tag to this note..."
          />
          <button type="submit">Add</button>
        </form>
        {error}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

AddTag = reduxForm({
  form: 'AddTag'
})(AddTag);

// export default connect(mapStateToProps)(AddTag);
export default RequiresLogin()(connect(mapStateToProps)(AddTag));