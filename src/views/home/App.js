import _ from 'lodash';
import React, { Component } from 'react';
import Header from '../../components/pwa.header';
import Main from '../../components/pwa.main';
import Dialog from '../../components/pwa.dialog';
import Loader from '../../components/pwa.loader';
import './App.less';

import FeatchService from '../../services/base.fetch';
import Util from '../../util';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.app = {
            visibleCards: {},
            daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            selectedCities: [],
            initialWeatherForecast: {
                key: '2459115',
                label: 'New York, NY',
                created: '2018-07-30T01:00:00Z',
                channel: {
                    astronomy: {
                        sunrise: "5:43 am",
                        sunset: "8:21 pm"
                    },
                    item: {
                        condition: {
                            text: "Windy",
                            date: "Mon, 30 Jul 2018 09:00 PM EDT",
                            temp: 56,
                            code: 24
                        },
                        forecast: [
                            {code: 44, high: 86, low: 70},
                            {code: 44, high: 94, low: 73},
                            {code: 4, high: 95, low: 78},
                            {code: 24, high: 75, low: 89},
                            {code: 24, high: 89, low: 77},
                            {code: 44, high: 92, low: 79},
                            {code: 44, high: 89, low: 77}
                        ]
                    },
                    atmosphere: {
                        humidity: 56
                    },
                    wind: {
                        speed: 25,
                        direction: 195
                    }
                }
            },
        };
        this.state = {
            showArr: []
        };
    }

    componentDidMount() {
        this.getLastForecast();
    }

    getLastForecast = () => {
        let {
            selectedCities,
            initialWeatherForecast
        } = this.app;
        
        selectedCities = localStorage.selectedCities;
        if (selectedCities) {
            this.app.selectedCities = JSON.parse(selectedCities);
            this.app.selectedCities.forEach(city => {
                this.getForecast(city.key, city.label);
            });
        } else {
            /* The user is using the app for the first time, or the user has not
            * saved any cities, so show the user some fake data. A real app in this
            * scenario could guess the user's location via IP lookup and then inject
            * that data into the page.
            */
            this.updateForecastCard(initialWeatherForecast);
            this.app.selectedCities = [
                {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
            ];
            Util.saveSelectedCities('selectedCities', this.app.selectedCities);
        }
    }

    getForecast = async (key, label) => {
        const { initialWeatherForecast } = this.app;

        const statement = `select * from weather.forecast where woeid=${key}`;
        const url = `https://query.yahooapis.com/v1/public/yql?format=json&q=${statement}`;
        // TODO add cache logic here
        if ('caches' in window) {
          /*
           * Check if the service worker has already cached this city's weather
           * data. If the service worker has the data, then display the cached
           * data while the app fetches the latest data.
           */
          caches.match(url).then((response) => {
            if (response) {
              response.json().then((json) => {
                const results = json.query.results;
                results.key = key;
                results.label = label;
                results.created = json.query.created;
                this.updateForecastCard(results);
              });
            }
          });
        }

        // Fetch the latest data.
        let response = await FeatchService.request(url);
        if (!_.isEmpty(response)) {
            const res = _.isString(response) ? JSON.parse(response) : response;
            const results = res.query.results;
            results.key = key;
            results.label = label;
            results.created = res.query.created;
            this.updateForecastCard(results);
        } else {
            // Return the initial weather forecast since no data is available.
            this.updateForecastCard(initialWeatherForecast);
        }
    }

    updateForecasts = () => {
        const {
            visibleCards
        } = this.app;

        this.loader.show();
        const keys = Object.keys(visibleCards);
        keys.forEach(key => {
          this.getForecast(key);
        });
    }

    updateForecastCard = data => {
        const { onCreateMainData } = this.props;

        const {
            visibleCards,
            daysOfWeek
        } = this.app;

        const dataLastUpdated = new Date(data.created);
        let {
            sunrise,
            sunset,
            current,
            humidity,
            wind
        } = {
            sunrise: data.channel.astronomy.sunrise,
            sunset: data.channel.astronomy.sunset,
            current: data.channel.item.condition,
            humidity: data.channel.atmosphere.humidity,
            wind: data.channel.wind
        };
    
        const obj = {
            cardLastUpdated: data.created,
            description: current.text,
            date: current.date,
            iconClass: Util.getIconClass(current.code),
            temperatureValue: Math.round(current.temp),
            sunrise,
            sunset,
            humidity: `${Math.round(humidity)}%`,
            windValue: Math.round(wind.speed),
            windDirection: wind.direction,
            weekData: Util.getWeekForecasts(daysOfWeek, data),
        };

        let card = visibleCards[data.key];
        if (!card) {
            visibleCards[data.key] = data.label;
            const arr = this.state.showArr;
            obj.label = data.label;
            arr.push(obj);
            this.setState({
                showArr: arr
            });
        }

        onCreateMainData(this.state.showArr);
    
        // Verifies the data provide is newer than what's already visible
        // on the card, if it's not bail, if it is, continue and update the
        // time saved in the card
        const temperatures = this.main.cardTemplat;
        const cardLastUpdatedElem = temperatures && temperatures.querySelector('.card-last-updated');
        let cardLastUpdated = cardLastUpdatedElem && cardLastUpdatedElem.textContent;
        if (cardLastUpdated) {
            cardLastUpdated = new Date(cardLastUpdated);
            // Bail if the card has more recent data then the data
            if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
                return;
            }
        }

        if (this.loader.getValue().loader) {
            this.loader.hide();
        }
    }

    handleDialogAdd = () => {
        let {
            selectedCities
        } = this.app;

        this.loader.show();
        const select = this.dialog.selectCityToAdd;
        const selected = select.options[select.selectedIndex];
        const key = selected.value;
        const label = selected.textContent;
        if (!selectedCities) {
          selectedCities = [];
        }
        this.getForecast(key, label);
        selectedCities.push({key: key, label: label});
        Util.saveSelectedCities('selectedCities', selectedCities);
    }

    render() {
        const {
            app
        } = this.props;

        return (
            <div className="App">
                <Header 
                    onBtnAdd={() => {this.dialog.show();}} 
                    onRefresh={this.updateForecasts} />
                <Main ref={el => this.main = el} data={app.maindata} />
                <Dialog ref={el => this.dialog = el} onAdd={this.handleDialogAdd} />
                <Loader ref={el => this.loader = el} />
            </div>
        );
    }
}

export default App;
