import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = (props) => {
    const [text, setText] = useState('');

    const onChangeHandler = (event) => {
        setText(event.target.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (text === '') {
            props.setAlertMessage('Please Enter a User', 'light');
        } else {
            props.searchUsers(text);
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
                {props.showClear && (
                    <button
                        type='reset'
                        className='btn btn-light btn-block'
                        onClick={props.clearUsers}>
                        Clear
                    </button>
                )}
            </form>
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

export default Search;
