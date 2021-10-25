/** @format */

import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
