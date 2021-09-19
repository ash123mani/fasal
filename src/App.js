import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/private-route";
import ProvideAuth from "./components/provide-auth";
import Header from "./components/header";
import Loader from "./components/loader";

import "./App.css";

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const AddFasal = lazy(() => import('./pages/add-fasal'));
const EditFasal = lazy(() => import('./pages/edit-fasal'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Header />
          <Suspense fallback={<Loader />}>
            <Switch>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/add-fasal">
                <AddFasal />
              </PrivateRoute>
              <PrivateRoute path="/fasal/:id">
                <EditFasal />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
