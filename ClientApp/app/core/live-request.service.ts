import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LiveRequest, LiveStatus } from '../model';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class LiveRequestService {

    private liveRequestUrl: string = '/api/AgentTransfer/MakeRequest';
    private acceptRequestUrl: string = '/api/AgentTransfer/AcceptRequest';
    private getRequestQueue: string = '/api/AgentTransfer/GetRequests';
    constructor(private http: Http) { }

    public sendLiveRequest$(conv_id: string, user_id: string): Rx.Observable<any> {
        return this.http.post(this.liveRequestUrl, new LiveRequest(conv_id, user_id, 'request'), this.getRequestOptions())
            .map(res => res.json());
    }

    public acceptRequest$(conv_id: string, uid: string): Rx.Observable<any> {
        
        return this.http.post(this.acceptRequestUrl, new LiveRequest(conv_id, uid, "remove"), this.getRequestOptions())
            .map(res => res.json());
    }


    public getDbRequests$() : Rx.Observable<LiveRequest[]> {
        let options = this.getRequestOptions();
        return this.http.get(this.getRequestQueue, options).map(res => res.json());
    }

    public getRequestOptions(authToken?: string): RequestOptions {
        return new RequestOptions(new Headers({ 'Content-Type': 'application/json' }));
    }

}