import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => Component => {
	function RequiresLogin(props) {
		const { authenticating, loggedIn, error, ...passThroughProps } = props;
		if (authenticating) {
			return <div>Logging in...</div>;
    } 
    else if (!loggedIn) {
			return <Redirect to="/" />;
		}
		return <Component {...passThroughProps} />;
	}

	// The display name of Higher-Order Components(which are seen in React Devtools)
	const displayName = Component.displayName || Component.name || 'Component';
	RequiresLogin.displayName = `RequiresLogin(${displayName})`;

	const mapStateToProps = (state, props) => ({
		authenticating: state.auth.loading,
		loggedIn: state.auth.user !== null,
		error: state.auth.error
	});
	return connect(mapStateToProps)(RequiresLogin);
};