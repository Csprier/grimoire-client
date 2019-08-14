import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/chip.css';

class Chip extends Component {
  render() {
    return (
      <div key={this.props.item} className="chip">
        <span>{this.props.item}</span>
        <span
          onClick={() => {
            this.props.dispatch(this.props.action);
          }}
          className="chip-remove"
        >
          &times;
        </span>
      </div>
    );
  }
}

export default connect()(Chip);