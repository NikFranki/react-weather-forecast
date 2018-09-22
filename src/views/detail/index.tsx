// import React, { Component } from 'react';
import * as React from 'react';
import StoreService from '../../services/store.assistance';
import './index.less';

import home from 'Src/assets/images/home.png';
import warn from 'Src/assets/images/warn.png';
import more from 'Src/assets/images/more.png';

interface IDetail {
    label: string;
    temperatureValue: number;
    iconClass: string;
    weekData?: any;
    description: string;
}

export default class Detail extends React.Component {

    render() {
        const detail = StoreService.getStateStore().detail;
        const item: IDetail = 'item' in detail ?
            detail.item : 
            null;
        return (
            item &&
            <div className="city-forecast-detail">
                <section className="top">
                    <img src={home} alt="home" />
                    <div className="city-name">
                            <p>{item.label}</p>
                        <p>Just updated</p>
                    </div>
                    <div className="operation">
                        <img src={warn} alt="warn" />
                        <img src={more} alt="more" />
                    </div>
                </section>
                <section className="content">
                    hello {item.label} !
                </section>
                <section className="bottom">
                    <div>
                        <span>{item.temperatureValue}°F</span>
                        <div className={item.iconClass}></div>
                    </div>
                    <div>
                        {item.description} {item.weekData[0].tempHighValue}/{item.weekData[0].tempLowValue}°F
                    </div>
                </section>
                    <section className={`bg ${item.iconClass}`}></section>
            </div>
        );
    }
}