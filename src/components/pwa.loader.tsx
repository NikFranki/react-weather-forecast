import * as React from 'react';
import './pwa.loader.less';

const initialState = {
    loader: true
}

type State = Readonly<typeof initialState>

export default class Loader extends React.Component {
   
    readonly state: State = initialState;

    static getDerivedStateFromProps(nextProps, prevState) {
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getValue = () => {
        return {loader: this.state.loader};
    }

    show = () => {
        this.setState({loader: true});
    }

    hide = () => {
        this.setState({loader: false});
    }

    renderLoader = () => {
        const { loader } = this.state;
        return  <div className={`${loader ? 'loader-bg-show' : 'loader-bg-hide'}`} hidden={!loader}>
                    <div className="loader">
                        <svg viewBox="0 0 32 32" width="32" height="32">
                            <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                        </svg>
                    </div>
                </div>;
    }

    render() {
        return this.renderLoader()
    }
}