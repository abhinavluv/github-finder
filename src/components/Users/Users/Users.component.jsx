import React from 'react';
import PropTypes from 'prop-types';
import UserItem from '../UserItem/UserItem.component';
import Spinner from '../../Layout/Spinner/Spinner.component';

const Users = (props) => {
    if (props.loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                {props.users.map((user) => {
                    return <UserItem key={user.id} user={user} />;
                })}
            </div>
        );
    }
};

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr',
    gridGap: '1rem',
};

Users.propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
};

export default Users;
