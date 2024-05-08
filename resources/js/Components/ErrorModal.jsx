import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ErrorModal = ({ show, message, close, timeout = 6000 }) => {
    if (!show) return null;

    useEffect(() => {
        if (!timeout) {
            return;
        }

        const timer = setTimeout(() => {
            close();
        }, timeout);

        return () => clearTimeout(timer);
    }, []);

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
