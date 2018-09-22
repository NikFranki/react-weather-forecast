// import React from 'react';
import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import Page from 'Src/views/page.index';
import History from 'Src/util/history.ts';

export default class RouterComponent extends React.Component {

    render() {
        return (
            <Router history={History}>
                <Route path="/" component={Page} />
            </Router>
        );
    }
}