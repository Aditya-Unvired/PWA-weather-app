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
  
  constructor(public _weatherService: WeatherService, private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      city: new FormControl(),
      country: new FormControl()
    })
  }
  
  ngOnInit(): void {}
  
  getDate(str: string) { 
    return str.split(' ')[0];
  }
  
  getTime(str: string) {
    return str.split(' ')[1];
  }
  
  displayWeather() {
    console.log('data',this.form)
    this._weatherService.getWeather(this.form.controls['city'].value, this.form?.controls['country'].value).subscribe(
      (data) => (this.weather = data),
      (err) => console.log(err)
    );
  }
}
