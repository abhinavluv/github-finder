import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../Layout/Spinner/Spinner.component';
import Repos from '../../Repos/Repos.component';

const User = (props) => {
    useEffect(() => {
        props.getUser(props.match.params.login);
        props.getUserRepos(props.match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        company,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = props.user;

    const { loading } = props.loading;

    if (loading) {
        return <Spinner />;
    } else {
        return (
            <React.Fragment>
                <Link to='/' className='btn btn-light'>
                    Back to Search
                </Link>
                <strong>Hireable</strong>{' '}
                {hireable ? (
                    <i className='fas fa-check text-success'></i>
                ) : (
                    <i className='fas fa-times-circle text-danger'></i>
                )}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img
                            src={avatar_url}
                            alt={login}
                            className='round-img'
                            style={{ width: '150px' }}
                        />
                        <h1>{name}</h1>
                        <p>
                            <strong>Location: </strong>
                            {location}
                        </p>
                    </div>
                    <div>
                        {bio && (
                            <React.Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </React.Fragment>
                        )}
                        <a href={html_url} className='btn btn-dark my-1'>
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>
                                {login && (
                                    <React.Fragment>
                                        <strong>Username: </strong>
                                        {login}
                                    </React.Fragment>
                                )}
                            </li>
                            <li>
                                {company && (
                                    <React.Fragment>
                                        <strong>Company: </strong>
                                        {company}
                                    </React.Fragment>
                                )}
                            </li>
                            <li>
                                {blog && (
                                    <React.Fragment>
                                        <strong>Website: </strong>
                                        {blog}
                                    </React.Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-primary'>
                        <strong>Followers: </strong>
                        {followers}
                    </div>
                    <div className='badge badge-success'>
                        <strong>Following: </strong>
                        {following}
                    </div>
                    <div className='badge badge-light'>
                        <strong>Public Repos: </strong>
                        {public_repos}
                    </div>
                    <div className='badge badge-dark'>
                        <strong>Public Gists: </strong>
                        {public_gists}
                    </div>
                </div>
                <div className='card'>
                    <h3 style={{ paddingTop: '20px' }}>Repositories</h3>
                    <Repos repos={props.repos} />
                </div>
            </React.Fragment>
        );
    }
};

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
};

export default User;
