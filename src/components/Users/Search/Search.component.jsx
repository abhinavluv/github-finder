import React, { Component } from 'react';

class Search extends Component {
    state = {
        text: '',
    };

    onChangeHandler = (event) => {
        this.setState({ text: event.target.value });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Please Enter a User', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    };

    render() {
        return (
            <div>
                <form className='form' onSubmit={this.onSubmitHandler}>
                    <input
                        type='text'
                        name='text'
                        value={this.state.text}
                        placeholder='Search Users...'
                        onChange={this.onChangeHandler}
                    />
                    <input
                        type='submit'
                        value='Search'
                        className='btn btn-dark btn-block'
                    />
                    {this.props.showClear && (
                        <button
                            type='reset'
                            className='btn btn-light btn-block'
                            onClick={this.props.clearUsers}>
                            Clear
                        </button>
                    )}
                </form>
            </div>
        );
    }
}

export default Search;
