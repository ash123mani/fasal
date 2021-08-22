import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './components/private-route'
import ProvideAuth from './components/provide-auth'
import Header from './components/header'

import Login from './pages/login'
import Home from './pages/home'
import AddFasal from './pages/add-fasal'

import './App.css'

function App() {
  return (
    <ProvideAuth>
    <Router>
    <Header />
      <div className="App">
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
        </Switch>
      </div>
    </Router>
    </ProvideAuth>

  );
}

export default App;
