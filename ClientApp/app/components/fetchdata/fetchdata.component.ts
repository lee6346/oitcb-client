
//from angular/core import the Component and Inject modules
import { Component, Inject } from '@angular/core';
//from angular/http import the Http modules
import { Http } from '@angular/http';

//selector is <fetchdata> or [route /fetchdata], render the fetchdata.component.html template
@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})

//export module with the following: forecast = array of WeatherForecast interface instances (referenced below)
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    //ORIGIN_URL is the key maps to the "localhost://5000" that we can configure later
    // THe value from the key is injected as a string value to the 'originURL variable'
    //http is a angular HTTP module type (with get methods)
    constructor(http: Http, @Inject('ORIGIN_URL') originUrl: string) {
        //calls the URL that maps to the SampleData controller, WeahterForecasts action
        //uses lambda that takes the result as parameter, then assignes the json format of results as Weather forcast[] 
        // object to the forecases variable here
        http.get(originUrl + '/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json() as WeatherForecast[];
        });
    }
}
//interface with 4 properties
interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}