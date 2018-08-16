import React from 'react';
import { render } from 'react-dom';
import './styles/index.css';
import Store from './store';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');
render(
    <Store>
        <Router />
    </Store>,
    root
);
registerServiceWorker();
