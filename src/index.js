import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

if (module.hot) {
    module.hot.accept() // you don't need this if you're using CRA

    module.hot.addStatusHandler(status => {
        if (status === 'prepare') console.clear()
    })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
