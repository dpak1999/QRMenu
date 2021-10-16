/** @format */

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from '../pages/Home';
import Login from '../pages/Login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/login" component={() => <Login />} />
        </Switch>
      </BrowserRouter>
      <ToastContainer position="top-right" closeOnClick autoClose={3000} />
    </>
  );
};

export default App;
