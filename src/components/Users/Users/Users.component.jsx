import React, { useContext } from 'react';
import UserItem from '../UserItem/UserItem.component';
import Spinner from '../../Layout/Spinner/Spinner.component';
import GithubContext from '../../../context/github/githubContext.component';

const Users = (props) => {
    const githubContext = useContext(GithubContext);
    if (githubContext.loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                {githubContext.users.map((user) => {
                    return <UserItem key={user.id} user={user} />;
                })}
            </div>
        );
    }
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem',
};

export default Users;
