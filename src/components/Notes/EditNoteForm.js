import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_BASE_URL } from '../../config';
import Axios from 'axios';

// Actions
import { toggleEditMode } from '../../actions/notes.actions';

class EditNoteForm extends Component {
  constructor() {
    super();
    this.state = {
      titleValue: '',
      contentValue: '',
      tags: [],
      folders: []
    }
    this.handleTitleValueChange = this.handleTitleValueChange.bind(this);
    this.handleContentValueChange = this.handleContentValueChange.bind(this);
  }

  componentDidMount() {
    let url = `${API_BASE_URL}/notes/${this.props.id}`;
    const authToken = this.props.auth.authToken;
    Axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'bearer ' + authToken
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(e => console.error(e));
  }

  handleTitleValueChange = (e) => {
    e.preventDefault();
    this.setState = ({
      titleValue: e.target.value
    });
  }

  handleContentValueChange = (e) => {
    e.preventDefault();
    this.setState = ({
      contentValue: e.target.value
    });
  }

  cancelEdit = e => {
    e.preventDefault();
    this.props.dispatch(toggleEditMode());
    // this.props.history.push('/dashboard');
  }

  render() {
    console.log('ENFs', this.state);
    return(
      <div>
        <h4>Edit Note</h4>
        <form>
          <label>Title
            <input 
              placeholder={this.props.title}
              value={this.state.titleValue}
              onChange={(e) => this.handleTitleValueChange(e)}
            />
          </label>
          <label>
            Content
            <textarea 
              placeholder={this.props.content}
              value={this.state.contentValue}
              onChange={(e) => this.handleContentValueChange(e)}
            />  
          </label>
          <ul>
            {(this.props.tags.length > 0) 
              ? this.props.tags.map(tag => <li key={tag._id}>{tag.name}</li>) 
              : <p>No tags to edit</p>}
          </ul>
          <ul>
            {(this.props.folders.length > 0) 
              ? this.props.folders.map(folder => <li key={folder._id}>{folder.name}</li>) 
              : <p>No folders to edit</p>}
          </ul>
        </form>
        <button type="submit">Save Changes</button>
        <button onClick={this.cancelEdit}>Cancel</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  auth: state.auth,
  editMode: state.notes.editMode
});

export default connect(mapStateToProps)(EditNoteForm);