import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../services/weather';
import { Storage } from '@ionic/storage';
// import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'page-local-weather',
  templateUrl: 'local-weather.html'
})
export class LocalWeatherPage {
  weather: any;
  location: {
    state: string,
    city: string
  }

  public locationList: Array<any> = [
    {city: 'Colombo', state: 'Sri Lanka'},
    {city: 'Matara', state: 'Sri Lanka'},
    {city: 'Galle', state: 'Sri Lanka'},
    {city: 'Kandy', state: 'Sri Lanka'},
    {city: 'Jaffna', state: 'Sri Lanka'},
    {city: 'Chavakachcheri', state: 'Sri Lanka'},
    {city: 'Batticaloa', state: 'Sri Lanka'},
    {city: 'Badulla', state: 'Sri Lanka'},
    {city: 'Anuradhapura', state: 'Sri Lanka'},
    {city: 'Monaragala', state: 'Sri Lanka'},
    {city: 'Ratnapura', state: 'Sri Lanka'},
    {city: 'Nuwara Eliya', state: 'Sri Lanka'}
  ]

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {
  }

  ionViewWillEnter() {

    this.storage.get('location').then((val) => {
      if (val != null) {
        this.location = JSON.parse(val);

      } else {
        this.location = {
          state: 'Sri Lanka',
          city: 'Colombo'
        }
      }

      this.getWeather(this.location)

    });

  }

  public getWeather(location) {
    if (typeof location === 'string') {
      this.location = JSON.parse(location);
      console.log(this.location);
    } else {
      this.location = location;
    }

    this.weatherProvider.getWeather(this.location.state, this.location.city).subscribe((weather: any) => {
      this.weather = weather.current_observation;
    });
  }

}
