import React from 'react';
import { render } from 'react-dom';
import './styles/index.css';
import App from './containers/pwa.app';
import Store from './store';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');
render(
    <Store>
        <App />
    </Store>,
    root
);
registerServiceWorker();
