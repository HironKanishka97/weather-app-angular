import {Component} from '@angular/core';
import {WeatherService} from "./services/weather.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
  isLoading = true;
  location: string = "Bandarawela";
  temperature: number = 20;
  humidity: number = 20;
  wind: number = 20;
  dewpoint: number = 20;
  weathericon: any;
  myForm!: FormGroup;
  cityName: String="Paris";

  constructor(private ws: WeatherService, private fb: FormBuilder) {
     this.myForm = this.fb.group({
      city: ['']
    });
  }
ngOnInit(){
    this.weatherData(this.cityName);
}

  weatherData(cityName: String) {
    console.log(cityName);
    let qry = `&q=${cityName}`;

    this.ws.getWeatherData(qry).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.weathericon = data.current.condition.icon;
        this.temperature = data.current.temp_c;
        this.dewpoint = data.current.dewpoint_c;
        this.humidity = data.current.humidity;
        this.wind = data.current.wind_mph;
        this.location = data.location.name;
      },
      error: (error) => {
        this.isLoading = false;
        this.weathericon = ''
        console.error("Error fetching weather data", error);
        alert("Enter a valid city name or check your internet connection.");
      },
      complete: () => {
        this.isLoading = false;
        console.log("Weather data fetching completed.");
      }
    });
  }

   onSubmit() {
     this.weatherData(this.myForm.controls['city'].value);
     this.myForm.controls['city'].reset();
  }
}
