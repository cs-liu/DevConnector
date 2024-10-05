import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  if (loading) {
    return <div>Loading...</div>; // 或者使用一个加载指示器
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
