import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Navbar from './components/Layout/Navbar/Navbar.component';
import Users from './components/Users/Users/Users.component';
import Search from './components/Users/Search/Search.component';
import Alert from './components/Layout/Alert/Alert.component';
import About from './components/Pages/About/About.component';
import User from './components/Users/User/User.component';

const App = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);

    useEffect(async () => {
        setLoading(true);
        const response = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUsers(response.data);
        setLoading(false);
    }, []);

    //Search Github users, text is being received from Search component
    const searchUsers = async (text) => {
        setLoading(true);
        const response = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUsers(response.data.items);
        setLoading(false);
    };

    // Clear Users from this.state
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    // Set alert if no username is input
    const setAlertMessage = (message, type) => {
        setAlert({ messageBody: message, messageType: type });
        setTimeout(() => setAlert(null), 3000);
    };

    // Get Single Github User
    const getUser = async (username) => {
        setLoading(true);
        const response = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUser(response.data);
        setLoading(false);
    };

    // Get User Repos
    const getUserRepos = async (username) => {
        setLoading(true);
        const response = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=10&sort=created:desc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setRepos(response.data);
        setLoading(false);
    };

    return (
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
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        setAlertMessage={setAlertMessage}
                                    />
                                    <Users loading={loading} users={users} />
                                </React.Fragment>
                            )}
                        />
                        <Route exact path='/about' component={About} />
                        <Route
                            exact
                            path='/user/:login'
                            render={(props) => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    user={user}
                                    repos={repos}
                                    loading={loading}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

App.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default App;
