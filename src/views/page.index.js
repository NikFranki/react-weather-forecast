import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import RouterRouterer from '../router/router.config';

export default class Page extends Component {

    renderRouter = () => {
        return (
            RouterRouterer.map(config => {
                const props = {
                    exact: config.exact,
                    key: config.url,
                    path: config.url,
                    component: config.component
                };
                return (
                    <Route {...props} />
                );
            })
        );
    }

    render() {
        return (
            <div className="route">
                {
                    this.renderRouter()
                }
            </div>
        );
    }
}