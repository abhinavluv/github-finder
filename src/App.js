import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import GithubState from './context/github/GithubState.component';
import AlertState from './context/alert/AlertState.component';

import Navbar from './components/Layout/Navbar/Navbar.component';
import Alert from './components/Layout/Alert/Alert.component';
import About from './components/Pages/About/About.component';
import User from './components/Users/User/User.component';
import Home from './components/Pages/Home/Home.component';
import NotFound from './components/Pages/NotFound/NotFound.component';

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
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
