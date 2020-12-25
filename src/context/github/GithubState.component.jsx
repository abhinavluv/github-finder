import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext.component';
import GithubReducer from './githubReducer.component';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    //Search Github users, text is being received from Search component
    const searchUsers = async (text) => {
        setLoading();
        const response = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({ type: SEARCH_USERS, payload: response.data.items });
    };

    // Get User
    // Get Single Github User
    const getUser = async (username) => {
        setLoading();
        const response = await axios.get(
            `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({ type: GET_USER, payload: response.data });
    };

    // Get Repos
    // Get User Repos
    const getUserRepos = async (username) => {
        setLoading();
        const response = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=10&sort=created:desc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
        );
        dispatch({ type: GET_REPOS, payload: response.data });
    };

    // Clear Users
    // Clear Users from this.state
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}>
            {props.children}
        </GithubContext.Provider>
    );
};

export default GithubState;
