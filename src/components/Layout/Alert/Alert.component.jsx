import React, { useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext.component';

function Alert(props) {
    const alertContext = useContext(AlertContext);
    return (
        alertContext.alert !== null && (
            <div className={`alert alert-${alertContext.alert.messageType}`}>
                <i className='fas fa-info-circle'></i>{' '}
                {alertContext.alert.messageBody}
            </div>
        )
    );
}

export default Alert;
