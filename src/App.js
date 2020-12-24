import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import axios from 'axios';

import Navbar from './components/Layout/Navbar/Navbar.component';
import Users from './components/Users/Users/Users.component';
import Search from './components/Users/Search/Search.component';
import Alert from './components/Layout/Alert/Alert.component';

class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null,
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    };

    async componentDidMount() {
        this.setState({ loading: true });
        const response = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ users: response.data, loading: false });
    }

    //Search Github users, text is being received from Search component
    searchUsers = async (text) => {
        this.setState({ loading: true });
        const response = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ users: response.data.items, loading: false });
    };

    // Clear Users from this.state
    clearUsers = () => {
        this.setState({ users: [], loading: false });
    };

    // Set alert if no username is input
    setAlert = (message, type) => {
        this.setState({ alert: { messageBody: message, messageType: type } });
        setTimeout(() => this.setState({ alert: null }), 3000);
    };

    render() {
        return (
            <div className='App'>
                <Navbar title='Github Finder' icon='fab fa-github' />
                <div className='container'>
                    <Alert alert={this.state.alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={this.state.users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                    />
                    <Users
                        loading={this.state.loading}
                        users={this.state.users}
                    />
                </div>
            </div>
        );
    }
}

export default App;
