import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private localData: any;

  private readonly apiKey: string = '0a807756b856ca3f925e1653337203d3';

  constructor(private _http: HttpClient) {}

  getWeather(city: number, country: number) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${this.apiKey}`;
    return this._http.get(apiUrl);
  }

  loadDataLocally() {
    return this._http.get('assets/Bangalore.json').subscribe((data: any) => 
    {
            this.localData = data;
    console.log('data 11',this.localData)
    localStorage.setItem('data',JSON.stringify(this.localData))
    },
      error => {
            console.error(error);
      });
  }

}
