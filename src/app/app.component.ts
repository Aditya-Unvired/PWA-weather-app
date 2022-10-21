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
    console.log('working')
    this.form = this.formBuilder.group({
      city: new FormControl(),
      country: new FormControl()
    })
  }
  
  ngOnInit() {
    this._weatherService.loadDataLocally();
    alert('working')
    console.log('working')
    addEventListener('online', (e) =>{
      alert('You are Online!!!')
      console.log('online') 
    })
    addEventListener('offline', (e) =>{
      alert('You are Offline!!!')
      console.log('offline')
    });
  }
  
  getDate(str: string) { 
    return str.split(' ')[0];
  }
  
  getTime(str: string) {
    return str.split(' ')[1];
  }
  
  displayWeather() {
    console.log('called for data')
    this._weatherService.getWeather(this.form.controls['city'].value, this.form?.controls['country'].value).subscribe((data: any) => 
    {
      console.log('called')
        if (data?.cod === "200") {
          this.weather = data;
          localStorage.setItem('data',JSON.stringify(this.weather))
        } else if (!data) {
      console.log('!data')
          this.weather = localStorage.getItem('data');
          this.weather = JSON.parse(this.weather)
        }
    },
      (err) => {
        console.log('errrr',err);
        this.weather = localStorage.getItem('data');
        this.weather = JSON.parse(this.weather)
      }
    );
  }
}
