import React, { useReducer } from 'react';
import AlertContext from './alertContext.component';
import AlertReducer from './alertReducer.component';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set alert if no username is input
    const setAlertMessage = (message, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { messageBody: message, messageType: type },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                setAlertMessage,
            }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
