import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// CSS
import './css/landing-page.css';

class LandingPage extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="landing-page">
        <div className="landing-page-info">
          <h1 className="title"><span className="fancy-g">G</span>rimoire</h1>
          <p>
            <span className="word">gri·moire</span>
            <br />
            <span>/ɡrimˈwär/</span>
            <br />
            <span className="italic">noun</span>
            <br />
            a book of spells and invocations.
          </p>
          <div className="landing-page-buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null
});

export default connect(mapStateToProps)(LandingPage);