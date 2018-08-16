import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import RouterRouterer from '../router/router.config';
import History from '../util/history';

export default class Page extends Component {
	constructor(props) {
		super(props);
	}

	renderRouter = () => {
        return (
            RouterRouterer.map(config => {
                return (
                    <Route exact={config.exact} key={config.url} path={config.url} component={config.component} />
                );
            })
        );
    }

	render() {
		return (
			<div>
				{
					this.renderRouter()
				}
			</div>
		);
	}
}