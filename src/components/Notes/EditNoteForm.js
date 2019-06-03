import React, { Component } from 'react';
import { connect } from 'react-redux';

// HOC
import RequiresLogin from '../requires-login';

class EditNoteForm extends Component {
  render() {
    return(
      <div>
        <h4>Edit Note</h4>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default RequiresLogin(connect(mapStateToProps)(EditNoteForm));