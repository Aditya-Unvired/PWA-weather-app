import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly apiKey: string = '0a807756b856ca3f925e1653337203d3';

  constructor(private _http: HttpClient) {}

  getWeather(city: number, country: number) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${this.apiKey}`;
    return this._http.get(apiUrl);
  }

}
