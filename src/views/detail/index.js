import React, { Component } from 'react';
import StoreService from '../../services/store.assistance';
import './index.less';

export default class Detail extends Component {

    render() {
        const detail = StoreService.getStateStore().detail;
        const item = 'item' in detail ?
            detail.item : 
            null;
        return (
            // hello { item ? item.label : 'null' } !
            item ?
            <div className="city-forecast-detail">
                <section className="top">
                    <img src={require('../../assets/images/home.png')} alt="home" />
                    <div className="city-name">
                            <p>{item.label}</p>
                        <p>Just updated</p>
                    </div>
                    <div className="operation">
                        <img src={require('../../assets/images/warn.png')} alt="warn" />
                        <img src={require('../../assets/images/more.png')} alt="more" />
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
            :
            null
        );
    }
}