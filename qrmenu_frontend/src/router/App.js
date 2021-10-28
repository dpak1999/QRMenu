/** @format */

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Place from '../pages/Place';
import Places from '../pages/Places';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/login" component={() => <Login />} />
          <Route exact path="/register" component={() => <Register />} />
          <Route exact path="/menu/:id/:table" component={() => <Menu />} />

          {/* protected routes */}
          <PrivateRoute exact path="/places/:id">
            <Place />
          </PrivateRoute>
          <PrivateRoute exact path="/places">
            <Places />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <ToastContainer position="top-right" closeOnClick autoClose={3000} />
    </AuthProvider>
  );
};

export default App;
