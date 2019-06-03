import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_BASE_URL } from '../../config';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

// Actions
import { toggleEditMode } from '../../actions/notes.actions';

class EditNoteForm extends Component {
  constructor() {
    super();
    this.state = {
      editNote: {
        id: '',
        title: '',
        content: '',
        tags: [],
        folders: []
      }
    }
    this.handleTitleValueChange = this.handleTitleValueChange.bind(this);
    this.handleContentValueChange = this.handleContentValueChange.bind(this);
  }

  componentDidMount() {
    let url = `${API_BASE_URL}/notes/${this.props.noteToEdit}`;
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
        this.setState({
          editNote: {
            id: res.data._id,
            title: res.data.title,
            content: res.data.content,
            tags: res.data.tags,
            folders: res.data.folders
          }
        });
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
  }

  render() {
    // console.log('ENFs', this.state.editNote);

    if (this.props.editMode === false) {
      return <Redirect to="/dashboard" />
    }

    return(
      <div>
        <h4>Edit Note</h4>
        <form>
          <label>Title
            <input 
              placeholder={this.state.editNote.title}
              value={this.state.editNote.title}
              onChange={(e) => this.handleTitleValueChange(e)}
            />
          </label>
          <label>
            Content
            <textarea 
              placeholder={this.state.editNote.content}
              value={this.state.content}
              onChange={(e) => this.handleContentValueChange(e)}
            />  
          </label>
          <ul>
            {(this.state.editNote.tags.length > 0) 
              ? this.state.editNote.tags.map(tag => <li key={tag}>{tag}</li>) 
              : <p>No tags to edit</p>}
          </ul>
          <ul>
            {(this.state.editNote.folders.length > 0) 
              ? this.state.editNote.folders.map(folder => <li key={folder}>{folder}</li>) 
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
  editMode: state.notes.editMode,
  noteToEdit: state.notes.noteToEdit
});

export default connect(mapStateToProps)(EditNoteForm);