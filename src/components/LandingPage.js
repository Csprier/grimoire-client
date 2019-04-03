import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="landing-page">
        <div className="landing-page-info">
          <h1>GRIMOIRE</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null
});

export default connect(mapStateToProps)(LandingPage);