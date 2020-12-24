import React from 'react';
import Search from '../../Users/Search/Search.component';
import Users from '../../Users/Users/Users.component';

const Home = () => {
    return (
        <React.Fragment>
            <Search />
            <Users />
        </React.Fragment>
    );
};

export default Home;
