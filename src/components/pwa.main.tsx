import * as React from 'react';
import History from 'Src/util/history.ts';
import './pwa.main.less';
import { check_detail } from 'Src/redux/actions';
import StoreService from 'Src/services/store.assistance';
import BScroll from 'better-scroll';

interface ItemObj {
    cardLastUpdated: string;
    description: string;
    date: string;
    iconClass: string;
    temperatureValue: number;
    sunrise: string;
    sunset: string;
    humidity: string;
    windValue: number;
    windDirection: string;
    weekData: any;
    label: string;
}

interface IProps {
    data: [object];
}

interface IState {
    main: string;
}

export default class Main extends React.Component<IProps, IState> {
    cardTemplate: any = null;

    public state: IState = {
        main: 'ss'
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return true
    }

    componentDidMount() {
        new BScroll('.main', {
            click: true
        });
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    renderMain = () => {
        const {
            data
        }: {data:[object]} = this.props;

        return  <main className="main" style={{height: document.body.clientHeight - 56}}>
                    <div className="content">
                        {
                            data.length > 0 && data.map((item: any, key) => {
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
                                }: ItemObj = item;

                                return (
                                    <div onClick={
                                        () => { 
                                            StoreService.dispatchAction(check_detail({ item }));
                                            History.push('/detail');
                                        }
                                        } ref={el => this.cardTemplate = el} className="card cardTemplate weather-forecast" key={key}>
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
                    </div>
                </main>;
    }

    render() {
        return this.renderMain()
    }
}