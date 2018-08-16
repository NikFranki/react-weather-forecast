import React from 'react';
import { Router, Route } from 'react-router-dom';
import Page from '../views/page.index';
import History from '../util/history';

export default class RouterComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router history={History}>
				<Route path="/" component={Page} />
			</Router>
		);
	}
}