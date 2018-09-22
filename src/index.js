import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'Src/styles/index.less';
import Store from 'Src/store/index';
import Router from 'Src/router/index';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

ReactDOM.render(
    <Store>
        <Router />
    </Store>,
    root
);
registerServiceWorker();
