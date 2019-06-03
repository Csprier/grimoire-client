import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditNoteForm extends Component {
  cancelEdit = e => {
    this.props.history.push('/dashboard');
  }

  render() {
    return(
      <div>
        <h4>Edit Note</h4>
        <form>
          <label>
            Test
            <input />
          </label>
        </form>
        <button type="submit">Save Changes</button>
        <button onClick={this.cancelEdit}>Cancel</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(EditNoteForm);