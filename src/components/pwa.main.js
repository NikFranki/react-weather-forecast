import React, { Component } from 'react';
import './pwa.main.less';

export default class Main extends Component {
    state = {
        main: 'ss'
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    renderMain = () => {
        return  <main className="main" style={{height: document.body.clientHeight - 56}}>
                    <div className="card cardTemplate weather-forecast" hidden>
                    <div className="city-key" hidden></div>
                    <div className="card-last-updated" hidden></div>
                    <div className="location"></div>
                    <div className="date"></div>
                    <div className="description"></div>
                    <div className="current">
                        <div className="visual">
                        <div className="icon"></div>
                        <div className="temperature">
                            <span className="value"></span><span className="scale">°F</span>
                        </div>
                        </div>
                        <div className="description">
                        <div className="humidity"></div>
                        <div className="wind">
                            <span className="value"></span>
                            <span className="scale">mph</span>
                            <span className="direction"></span>°
                        </div>
                        <div className="sunrise"></div>
                        <div className="sunset"></div>
                        </div>
                    </div>
                    <div className="future">
                        <div className="oneday">
                        <div className="date"></div>
                        <div className="icon"></div>
                        <div className="temp-high">
                            <span className="value"></span>°
                        </div>
                        <div className="temp-low">
                            <span className="value"></span>°
                        </div>
                        </div>
                        <div className="oneday">
                        <div className="date"></div>
                        <div className="icon"></div>
                        <div className="temp-high">
                            <span className="value"></span>°
                        </div>
                        <div className="temp-low">
                            <span className="value"></span>°
                        </div>
                        </div>
                        <div className="oneday">
                        <div className="date"></div>
                        <div className="icon"></div>
                        <div className="temp-high">
                            <span className="value"></span>°
                        </div>
                        <div className="temp-low">
                            <span className="value"></span>°
                        </div>
                        </div>
                        <div className="oneday">
                        <div className="date"></div>
                        <div className="icon"></div>
                        <div className="temp-high">
                            <span className="value"></span>°
                        </div>
                        <div className="temp-low">
                            <span className="value"></span>°
                        </div>
                        </div>
                        <div className="oneday">
                        <div className="date"></div>
                        <div className="icon"></div>
                        <div className="temp-high">
                            <span className="value"></span>°
                        </div>
                        <div className="temp-low">
                            <span className="value"></span>°
                        </div>
                        </div>
                        <div className="oneday">
                        <div className="date"></div>
                        <div className="icon"></div>
                        <div className="temp-high">
                            <span className="value"></span>°
                        </div>
                        <div className="temp-low">
                            <span className="value"></span>°
                        </div>
                        </div>
                        <div className="oneday">
                        <div className="date"></div>
                        <div className="icon"></div>
                        <div className="temp-high">
                            <span className="value"></span>°
                        </div>
                        <div className="temp-low">
                            <span className="value"></span>°
                        </div>
                        </div>
                    </div>
                    </div>
                </main>;
    }

    render() {
        return this.renderMain()
    }
}