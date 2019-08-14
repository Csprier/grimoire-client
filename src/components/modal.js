import React, { Component } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { showModal } from '../actions/modal.actions';

// CSS
import '../components/css/modal.css';


class Modal extends Component {
  onClose = () => {
    this.props.dispatch(showModal());
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal" id="modal">
        <h1>{this.props.modalHeader}</h1>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.modal.show
});

export default connect(mapStateToProps)(Modal);