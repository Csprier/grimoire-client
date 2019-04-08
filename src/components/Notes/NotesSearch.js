import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import renderField from '../Field/renderField';
import { updateSearchTerm, updateSearchTermSuccess, searchNotes } from '../../actions/search.actions';

// Actions for search term
// import { updateSearchTerm } from '../../actions/search.actions';
// import { getNotes } from '../../actions/notes.actions';

class NotesSearch extends Component {
  handleSearchSubmit(e) {
    let searchTerm = e;
    this.props.dispatch(searchNotes(searchTerm));
  }

  render() {
    return (
      <div className="notes-form-container">
       {/* <form onSubmit={this.props.handleSubmit((e) => {
            this.handleSearchSubmit(e.searchTerm);
          })} ref="form"> */}
          <form ref="form">
            <label htmlFor="NotesSearch"></label>
            <Field 
              name="searchTerm"
              component={renderField}
              onChange={event => {
                console.log("searchTerm: " + event.target.value);
                this.props.dispatch(updateSearchTerm(event.target.value));
                this.props.dispatch(updateSearchTermSuccess());
                this.handleSearchSubmit(this.props.searchTerm);
              }}
              value={this.props.values}
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