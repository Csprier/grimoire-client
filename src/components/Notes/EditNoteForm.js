import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditNoteForm extends Component {
  cancelEdit = e => {
    this.props.history.push('/dashboard');
  }

  render() {
    console.log('ENF', this.props);
    return(
      <div>
        <h4>Edit Note</h4>
        <form>
          <label>Title
            <input value={this.props.title} />
          </label>
          <label>
            Content
            <input value={this.props.content} />  
          </label>
          <ul>
            {(this.props.tags.length > 0) ? this.props.tags.map(tag => <li key={tag._id}>{tag.name}</li>) : <p>No tags to edit</p>}
          </ul>
          <ul>
            {(this.props.folders.length > 0) ? this.props.folders.map(folder => <li key={folder._id}>{folder.name}</li>) : <p>No folders to edit</p>}
          </ul>
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