import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../enviorenments/enviorenment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getWeatherData(qry: String) {
    return this.http.get<any>(environment.apiUrl + qry + environment.urlSuffix)
  }
}
