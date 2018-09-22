import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'Src/redux/reducers';

interface IProps {
    children: any,
}

export default class Store extends React.Component<IProps> {
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