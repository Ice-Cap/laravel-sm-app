import React from 'react';
import ReactDOM from 'react-dom';

const ErrorModal = ({ show, message, close }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="error-modal">
            <h2>Error</h2>
            <p>{message}</p>
            <button onClick={close}>Close</button>
        </div>,
        document.body
    );
};

export default ErrorModal;
