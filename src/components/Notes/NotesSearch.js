import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import renderField from '../Field/renderField';

import { updateSearchTerm } from '../../actions/search.actions';

class NotesSearch extends Component {
  handleSearchSubmit(e) {
    let searchTerm = e;
    this.props.dispatch(updateSearchTerm(searchTerm))
  }

  render() {
    return (
      <div className="notes-form-container">
       <form onSubmit={this.props.handleSubmit((e) => {
            this.handleSearchSubmit(e.searchTerm);
          })} ref="form">
            <label htmlFor="NotesSearch"></label>
            <Field 
              name="searchTerm"
              component={renderField}
              type="text"
              placeholder="Search notes..."
            />
            <button type="submit" className="search-button" label="submit">&#x26B2;</button>
          </form>
      </div>
    )
  }
}

NotesSearch = reduxForm({
  form: 'NotesSearch'
})(NotesSearch);

const mapStateToProps = state => ({
  searchTerm: state.search.query.searchTerm
});

export default connect(mapStateToProps)(NotesSearch);