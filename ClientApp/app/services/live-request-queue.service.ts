import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LiveRequestQueueService {

    //should be localhost://90433/api/controller...
    private requestUrl = 'http://localhost:52131/api/LiveChat/PendingRequests';

    constructor(private http: Http) {

    }

    //the return type should be Request objects, not 'any[]'
    /*
    getRequestQueue(): Observable<any[]> {
        return this.http.get(this.requestUrl).map(this)
    }*/
}

