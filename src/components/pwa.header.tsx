import * as React from 'react';
import './pwa.header.less';

const initialState = {
    test: true
}

type State = Readonly<typeof initialState>

interface IProps {
    onRefresh: any;
    onBtnAdd: any;
}

export default class Header extends React.Component<IProps> {
    header = null;

    readonly state: State = initialState; 

    // 虚拟dom后，挂载之前调用
    static getDerivedStateFromProps(nextProps, prevState) {
        // if (nextProps.isLogin !== prevState.isLogin) {
        //     return {
        //       isLogin: nextProps.isLogin,
        //     };
        // }
        return null;
    }

    // 在最终render之前，返回一个值，这个值随后会被传入到componentDidUpdate中，可以在componentDidUpdate更新组件状态
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        // if (prevProps.list.length < this.props.list.length) {
        //   return (
        //     this.listRef.scrollHeight - this.listRef.scrollTop
        //   );
        // }
        return null;
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (!prevState.isLogin && this.props.isLogin) {
        //   this.handleClose();
        // }
    }

    renderHeader = () => {
        const {
            onRefresh,
            onBtnAdd
        } = this.props;

        return <header ref={this.setHeadRef} className="header">
                <h1 className="header__title">Weather PWA</h1>
                <button id="butRefresh" className="headerButton" aria-label="Refresh" onClick={onRefresh}></button>
                <button id="butAdd" className="headerButton" aria-label="Add" onClick={onBtnAdd}></button>
            </header>;
    }

    setHeadRef = ref => {
        this.header = ref;
    }

    render() {
        return this.renderHeader()
    }
}