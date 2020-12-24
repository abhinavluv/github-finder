import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Layout/Navbar/Navbar.component';
import Users from './components/Users/Users/Users.component';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Navbar title='Github Finder' icon='fab fa-github' />
                <div className='container'>
                    <Users />
                </div>
            </div>
        );
    }
}

export default App;
