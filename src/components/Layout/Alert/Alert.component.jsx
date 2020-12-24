import React from 'react';

function Alert(props) {
    return (
        props.alert !== null && (
            <div className={`alert alert-${props.alert.messageType}`}>
                <i className='fas fa-info-circle'></i> {props.alert.messageBody}
            </div>
        )
    );
}

export default Alert;
