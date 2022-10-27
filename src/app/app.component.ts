import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  weather: any = null;
  public form: FormGroup;
  
  constructor(public _weatherService: WeatherService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      city: new FormControl(),
      country: new FormControl()
    })
  }
  
  ngOnInit() {
    this._weatherService.loadDataLocally();
    addEventListener('online', (e) =>{
      alert('You are Online!!!')
    })
    addEventListener('offline', (e) =>{
      alert('You are Offline!!!')
    });
  }
  
  getDate(str: string) { 
    return str.split(' ')[0];
  }
  
  displayWeather() {
    this._weatherService.getWeather(this.form.controls['city'].value, this.form?.controls['country'].value).subscribe((data: any) => 
    {
        if (data?.cod === "200") {
          this.weather = data;
        } else if (!data) {
          this.weather = localStorage.getItem('data');
          this.weather = JSON.parse(this.weather);
        }
    },
      (err) => {
        this.weather = localStorage.getItem('data');
        this.weather = JSON.parse(this.weather);
      }
    );
  }
}
