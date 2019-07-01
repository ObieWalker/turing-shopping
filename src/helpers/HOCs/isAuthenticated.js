import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function isAuthenticated(ComposedComponent, roles, preferredRedirectPath) {
  class AuthRoute extends Component {
    state = {}

    componentWillMount() {
      this.handleRedirection(this.props);
    }

    componentWillUpdate(nextProps) {
      this.handleRedirection(nextProps);
    }

    handleRedirection = (props) => {
      const { authenticated } = props;

      if (!authenticated) {
        props.history.push('/');
        return null;
      }
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />
    }
  }

  const mapStateToProps = ({ users }) => ({
    authenticated: users.authenticated
  });
  return withRouter(connect(mapStateToProps, null)(AuthRoute));
}
