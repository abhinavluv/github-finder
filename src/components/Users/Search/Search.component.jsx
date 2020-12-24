import React, { useState, useContext } from 'react';
import GithubContext from '../../../context/github/githubContext.component';
import AlertContext from '../../../context/alert/alertContext.component';

const Search = (props) => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const [text, setText] = useState('');

    const onChangeHandler = (event) => {
        setText(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (text === '') {
            alertContext.setAlertMessage('Please Enter a User', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    };

    return (
        <div>
            <form className='form' onSubmit={onSubmitHandler}>
                <input
                    type='text'
                    name='text'
                    value={text}
                    placeholder='Search Users...'
                    onChange={onChangeHandler}
                />
                <input
                    type='submit'
                    value='Search'
                    className='btn btn-dark btn-block'
                />
                {githubContext.users.length > 0 && (
                    <button
                        type='reset'
                        className='btn btn-light btn-block'
                        onClick={githubContext.clearUsers}>
                        Clear
                    </button>
                )}
            </form>
        </div>
    );
};

export default Search;
