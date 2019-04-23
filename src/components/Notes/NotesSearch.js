import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field, 
  reduxForm
} from 'redux-form';
import renderField from '../Field/renderField';
import { updateSearchTerm, updateSearchTermSuccess, searchNotes } from '../../actions/search.actions';

// CSS
import '../css/notes/notes-search.css'; 

class NotesSearch extends Component {
  handleSearchSubmit() {
    this.props.dispatch(searchNotes());
  }

  render() {
    return (
      <div className="notes-form-container">
        <form ref="form">
          <label htmlFor="NotesSearch"></label>
          <Field 
            name="searchTerm"
            component={renderField}
            onChange={(event) => {
              this.props.dispatch(updateSearchTerm(event.target.value));
              this.props.dispatch(updateSearchTermSuccess());
              this.handleSearchSubmit(this.props.searchTerm);
            }}
            value={this.props.values}
            type="text"
            placeholder="Search notes..."
          />
          {/* <button type="submit" className="search-button" label="submit">&#x26B2;</button> */}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchTerm: state.search.query.searchTerm
});

NotesSearch = reduxForm({
  form: 'NotesSearch'
})(NotesSearch);

export default connect(mapStateToProps)(NotesSearch);