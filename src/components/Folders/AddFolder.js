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
import { addNewFolder } from '../../actions/folders.actions';

// CSS
import '../css/folders/add-folder.css';

class AddFolder extends Component {
  handleAddFolderSubmit = (e) => {
    let userId = this.props.user.id,
        name = e["add-folder"];

    console.log(`Add folder "${name}" to user ${userId}.`);
    this.props.dispatch(addNewFolder(userId, name));
  }

  render() {
    let { error } = this.props;
    if (error) {
      error = (
        <div className="folder-error">
          <p>{this.props.error}</p>
        </div>
      )
    }

    return (
      <div className="add-folder-form-container">
        <form onSubmit={this.props.handleSubmit((e) => {
          this.handleAddFolderSubmit(e);
        })} ref="form" className="add-folder-form">
          <Field 
            name="add-folder"
            component={renderField}
            value={this.props.values}
            type="text"
            placeholder="Add a folder to the database..."
          />
          <button type="submit">Add</button>
        </form>
        {error}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

AddFolder = reduxForm({
  form: 'AddFolder'
})(AddFolder);

export default RequiresLogin()(connect(mapStateToProps)(AddFolder));