import React, { Component } from 'react';
import History from '../util/history';
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
        const {
            data
        } = this.props;

        return  <main className="main" style={{height: document.body.clientHeight - 56}}>
                    {
                        data.length > 0 && data.map((item, key) => {
                            const {
                                cardLastUpdated,
                                description,
                                date,
                                iconClass,
                                temperatureValue,
                                sunrise,
                                sunset,
                                humidity,
                                windValue,
                                windDirection,
                                weekData,
                                label,
                            } = item;

                            return (
                                <div onClick={() => History.push('/detail')} ref={el => this.cardTemplate = el} className="card cardTemplate weather-forecast" key={key}>
                                    <div className="city-key" hidden></div>
                                    <div className="card-last-updated" hidden>{cardLastUpdated}</div>
                                    <div className="location">{label}</div>
                                    <div className="date">{date}</div>
                                    <div className="description">{description}</div>
                                    <div className="current">
                                        <div className="visual">
                                        <div className={`icon ${iconClass}`}></div>
                                        <div className="temperature">
                                            <span className="value">{temperatureValue}</span><span className="scale">°F</span>
                                        </div>
                                        </div>
                                        <div className="description">
                                        <div className="humidity">{humidity}</div>
                                        <div className="wind">
                                            <span className="value">{windValue}</span>
                                            <span className="scale">mph</span>
                                            <span className="direction">{windDirection}</span>°
                                        </div>
                                        <div className="sunrise">{sunrise}</div>
                                        <div className="sunset">{sunset}</div>
                                        </div>
                                    </div>
                                    <div className="future">
                                        {
                                            weekData && weekData.map((item, index) => 
                                                <div className="oneday" key={index}>
                                                    <div className="date">{item.date}</div>
                                                    <div className={`icon ${iconClass}`}></div>
                                                    <div className="temp-high">
                                                        <span className="value">{item.tempHighValue}</span>°
                                                    </div>
                                                    <div className="temp-low">
                                                        <span className="value">{item.tempLowValue}</span>°
                                                    </div>
                                                </div>)
                                        }
                                    </div>
                                </div>
                            )
                         })
                    }
                </main>;
    }

    render() {
        return this.renderMain()
    }
}