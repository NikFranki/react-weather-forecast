import * as React from 'react';

import { Route } from 'react-router-dom';
import RouterRouterer from 'Src/router/router.config';

interface Rprops {
    exact: boolean;
    key: string;
    path: string;
    component: any;
}

export default class Page extends React.Component {

    renderRouter = () => {
        return (
            RouterRouterer.map(config => {
                const props: Rprops = {
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