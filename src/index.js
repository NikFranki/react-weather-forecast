import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'Src/styles/index.css';
import Store from 'Src/store';
import Router from 'Src/router';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

ReactDOM.render(
    <Store>
        <Router />
    </Store>,
    root
);
registerServiceWorker();
