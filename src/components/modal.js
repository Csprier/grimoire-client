import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { showModal } from '../actions/modal.actions';

// CSS
import '../components/css/modal.css';


class Modal extends Component {
  // send a value back to App
  // onClose = e => this.props.onClose && this.props.onClose(e);
  onClose = e => {
    this.props.dispatch(showModal());
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <div className="content">{this.props.children}</div>
        <div className="actions">
          <button 
            className="toggle-button"
            onClick={this.onClose}
          >OK</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.modal.show
});

export default connect(mapStateToProps)(Modal);