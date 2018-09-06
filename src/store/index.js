import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'Src/redux/reducers';

export default class Store extends Component {
    render() {
        const style = {width: '100%'};
        const obj = {store};
        const children = React.Children.only(this.props.children);
        const newChildren = React.cloneElement(children, {
                ...children.props.style, ...style
            }
        );

        return (
            <div className="store">
                <Provider {...obj}>
                    {newChildren}
                </Provider>
            </div>
        )
    }
}