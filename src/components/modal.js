import React, { Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  // send a value back to App
  onClose = e => this.props.onClose && this.props.onClose(e);

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div>
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