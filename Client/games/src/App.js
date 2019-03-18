import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import Home from './views/home';
import Login from './views/login';
import Register from './views/register';
import NotFound from './views/not-found';
import CreateGame from './views/create-game';
import EditGame from './views/edit-game';
import DetailsGame from './views/details-game';

import Header from './components/header'

import './App.css';
import { UserProvider, defaultUserState } from './components/context/user';

class App extends Component {
  constructor(props) {
    super(props);

    const userFromStorage = window.localStorage.getItem('user');
    const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

    this.state = {
      user: {
        ...defaultUserState.isLoggedIn,
        ...defaultUserState.isAdmin,
        ...parsedUser,
        updateUser: this.updateUser
      }
    }
    this.logout = this.logout.bind(this);
  }

  updateUser = (user) => {
    this.setState({ user });
  };

  logout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    this.updateUser(defaultUserState)
      .then(<Redirect to="/" />);
  };

  render() {

    const { user } = this.state;

    return (
      <div>
        <Router>
          <Fragment>
            <UserProvider value={user}>
              <Header logout={this.logout} />
              <Switch>
                <Route exact path="/" component={() => <Home user={this.state.user} />} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/creategame" component={CreateGame} />
                <Route exact path="/editgame/:id" component={EditGame} />
                <Route exact path="/detailsgame/:id" component={DetailsGame} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
              </Switch>
            </UserProvider>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
