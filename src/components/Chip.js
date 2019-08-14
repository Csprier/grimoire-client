import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/chip.css';

class Chip extends Component {
  render() {
    return (
      <div key={this.props.item} className="chip">
        <span>{this.props.item}</span>
        <button
          onClick={() => {
            this.props.dispatch(this.props.action);
          }}
          value={this.props.item}
          className="chip-remove"
        >
          &times;
        </button>
      </div>
    );
  }
}

export default connect()(Chip);