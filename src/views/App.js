import React, { Component } from 'react';
import Header from '../components/pwa.header';
import Main from '../components/pwa.main';
import Dialog from '../components/pwa.dialog';
import Loader from '../components/pwa.loader';
import './App.less';

import Api from '../model/pwa.api';
import { Say_Hello } from '../redux/actions';

class App extends Component {
    
    componentDidMount() {
        this.visibleCards = {};
        this.cardTemplate = document.querySelector('.cardTemplate');
        this.container = document.querySelector('.main');
        this.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.selectedCities = [];
        this.initialWeatherForecast = {
            key: '2459115',
            label: 'New York, NY',
            created: '2016-07-22T01:00:00Z',
            channel: {
                astronomy: {
                    sunrise: "5:43 am",
                    sunset: "8:21 pm"
                },
                item: {
                    condition: {
                        text: "Windy",
                        date: "Thu, 21 Jul 2016 09:00 PM EDT",
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
        };
        this.getFakeForecast();
        this.getLastForecast();
    }

    getFakeForecast = () => {
        this.updateForecastCard(this.initialWeatherForecast);
    }

    getLastForecast = () => {
        this.selectedCities = localStorage.selectedCities;
        if (this.selectedCities) {
            this.selectedCities = JSON.parse(this.selectedCities);
            this.selectedCities.forEach(city => {
                this.getForecast(city.key, city.label);
            });
        } else {
            /* The user is using the app for the first time, or the user has not
            * saved any cities, so show the user some fake data. A real app in this
            * scenario could guess the user's location via IP lookup and then inject
            * that data into the page.
            */
            this.updateForecastCard(this.initialWeatherForecast);
            this.selectedCities = [
            {key: this.initialWeatherForecast.key, label: this.initialWeatherForecast.label}
            ];
            this.saveSelectedCities();
        }
    }

    saveSelectedCities = () => {
        var selectedCities = JSON.stringify(this.selectedCities);
        localStorage.selectedCities = selectedCities;
    }

    getForecast = (key, label) => {
        var statement = 'select * from weather.forecast where woeid=' + key;
        var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
            statement;
        // TODO add cache logic here
        if ('caches' in window) {
          /*
           * Check if the service worker has already cached this city's weather
           * data. If the service worker has the data, then display the cached
           * data while the app fetches the latest data.
           */
          caches.match(url).then(function(response) {
            if (response) {
              response.json().then(function updateFromCache(json) {
                var results = json.query.results;
                results.key = key;
                results.label = label;
                results.created = json.query.created;
                this.updateForecastCard(results);
              });
            }
          });
        }
        // Fetch the latest data.
        var request = new XMLHttpRequest();
        request.onreadystatechange = () => {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
              var response = JSON.parse(request.response);
              var results = response.query.results;
              results.key = key;
              results.label = label;
              results.created = response.query.created;
              this.updateForecastCard(results);
            }
          } else {
            // Return the initial weather forecast since no data is available.
            this.updateForecastCard(this.initialWeatherForecast);
          }
        };
        request.open('GET', url);
        request.send();
    }

    updateForecasts = () => {
        this.loader.show();
        var keys = Object.keys(this.visibleCards);
        keys.forEach((key) => {
          this.getForecast(key);
        });
    }

    updateForecastCard = data => {
        var dataLastUpdated = new Date(data.created);
        var sunrise = data.channel.astronomy.sunrise;
        var sunset = data.channel.astronomy.sunset;
        var current = data.channel.item.condition;
        var humidity = data.channel.atmosphere.humidity;
        var wind = data.channel.wind;
    
        var card = this.visibleCards[data.key];
        if (!card) {
            card = this.cardTemplate.cloneNode(true);
            card.classList.remove('cardTemplate');
            card.querySelector('.location').textContent = data.label;
            card.removeAttribute('hidden');
            this.container.appendChild(card);
            this.visibleCards[data.key] = card;
        }
    
        // Verifies the data provide is newer than what's already visible
        // on the card, if it's not bail, if it is, continue and update the
        // time saved in the card
        var cardLastUpdatedElem = card.querySelector('.card-last-updated');
        var cardLastUpdated = cardLastUpdatedElem.textContent;
        if (cardLastUpdated) {
            cardLastUpdated = new Date(cardLastUpdated);
            // Bail if the card has more recent data then the data
            if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
            return;
            }
        }
        cardLastUpdatedElem.textContent = data.created;
    
        card.querySelector('.description').textContent = current.text;
        card.querySelector('.date').textContent = current.date;
        card.querySelector('.current .icon').classList.add(this.getIconClass(current.code));
        card.querySelector('.current .temperature .value').textContent =
        Math.round(current.temp);
        card.querySelector('.current .sunrise').textContent = sunrise;
        card.querySelector('.current .sunset').textContent = sunset;
        card.querySelector('.current .humidity').textContent =
        Math.round(humidity) + '%';
        card.querySelector('.current .wind .value').textContent =
        Math.round(wind.speed);
        card.querySelector('.current .wind .direction').textContent = wind.direction;
        var nextDays = card.querySelectorAll('.future .oneday');
        var today = new Date();
        today = today.getDay();
        for (var i = 0; i < 7; i++) {
            var nextDay = nextDays[i];
            var daily = data.channel.item.forecast[i];
            if (daily && nextDay) {
            nextDay.querySelector('.date').textContent =
                this.daysOfWeek[(i + today) % 7];
            nextDay.querySelector('.icon').classList.add(this.getIconClass(daily.code));
            nextDay.querySelector('.temp-high .value').textContent =
                Math.round(daily.high);
            nextDay.querySelector('.temp-low .value').textContent =
                Math.round(daily.low);
            }
        }
        if (this.loader.getValue().loader) {
            this.container.removeAttribute('hidden');
            this.loader.hide();
        }
    }

    getIconClass = weatherCode => {
        // Weather codes: https://developer.yahoo.com/weather/documentation.html#codes
        weatherCode = parseInt(weatherCode);
        switch (weatherCode) {
            case 25: // cold
            case 32: // sunny
            case 33: // fair (night)
            case 34: // fair (day)
            case 36: // hot
            case 3200: // not available
                return 'clear-day';
            case 0: // tornado
            case 1: // tropical storm
            case 2: // hurricane
            case 6: // mixed rain and sleet
            case 8: // freezing drizzle
            case 9: // drizzle
            case 10: // freezing rain
            case 11: // showers
            case 12: // showers
            case 17: // hail
            case 35: // mixed rain and hail
            case 40: // scattered showers
                return 'rain';
            case 3: // severe thunderstorms
            case 4: // thunderstorms
            case 37: // isolated thunderstorms
            case 38: // scattered thunderstorms
            case 39: // scattered thunderstorms (not a typo)
            case 45: // thundershowers
            case 47: // isolated thundershowers
                return 'thunderstorms';
            case 5: // mixed rain and snow
            case 7: // mixed snow and sleet
            case 13: // snow flurries
            case 14: // light snow showers
            case 16: // snow
            case 18: // sleet
            case 41: // heavy snow
            case 42: // scattered snow showers
            case 43: // heavy snow
            case 46: // snow showers
                return 'snow';
            case 15: // blowing snow
            case 19: // dust
            case 20: // foggy
            case 21: // haze
            case 22: // smoky
                return 'fog';
            case 24: // windy
            case 23: // blustery
                return 'windy';
            case 26: // cloudy
            case 27: // mostly cloudy (night)
            case 28: // mostly cloudy (day)
            case 31: // clear (night)
                return 'cloudy';
            case 29: // partly cloudy (night)
            case 30: // partly cloudy (day)
            case 44: // partly cloudy
                return 'partly-cloudy-day';
        }
    }

    handleDialogAdd = () => {
        this.loader.show();
        var select = document.getElementById('selectCityToAdd');
        var selected = select.options[select.selectedIndex];
        var key = selected.value;
        var label = selected.textContent;
        if (!this.selectedCities) {
          this.selectedCities = [];
        }
        this.getForecast(key, label);
        this.selectedCities.push({key: key, label: label});
        this.saveSelectedCities();
    }

    render() {
        console.log(Api.initApi());
        console.log(this.props);
        return (
            <div className="App">
                <Header 
                    onBtnAdd={() => {this.dialog.show();}} 
                    onRefresh={this.updateForecasts} />
                <Main />
                <Dialog ref={el => this.dialog = el} onAdd={this.handleDialogAdd} />
                <Loader ref={el => this.loader = el} />
            </div>
        );
    }
}

export default App;
