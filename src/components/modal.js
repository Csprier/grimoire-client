import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../components/css/modal.css';

class Modal extends Component {
  // send a value back to App
  onClose = e => this.props.onClose && this.props.onClose(e);

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

export default connect()(Modal);