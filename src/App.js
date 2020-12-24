import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import GithubState from './context/github/GithubState.component';
import AlertState from './context/alert/AlertState.component';

import Navbar from './components/Layout/Navbar/Navbar.component';
import Users from './components/Users/Users/Users.component';
import Search from './components/Users/Search/Search.component';
import Alert from './components/Layout/Alert/Alert.component';
import About from './components/Pages/About/About.component';
import User from './components/Users/User/User.component';

const App = (props) => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className='App'>
                        <Navbar title='Github Finder' icon='fab fa-github' />
                        <div className='container'>
                            <Alert alert={alert} />
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    render={(props) => (
                                        <React.Fragment>
                                            <Search />
                                            <Users />
                                        </React.Fragment>
                                    )}
                                />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
