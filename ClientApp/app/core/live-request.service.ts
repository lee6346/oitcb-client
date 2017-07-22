import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LiveRequest } from '../model/LiveRequest';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LiveRequestService {

    private liveRequestUrl: string = '/api/AgentTransfer/MakeRequest';
    private acceptRequestUrl: string = '/api/AgentTransfer/AcceptRequest';
    private getRequestQueue: string = '/api/AgentTransfer/GetRequests';
    constructor(private http: Http) { }

    public sendLiveRequest$(conv_id: string, user?: string) {

        let request = new LiveRequest(conv_id, 'request', user);
        let options = this.getRequestOptions();
        return this.http.post(this.liveRequestUrl, request, options).map(res => this.agentAvailable(res));
    }

    public acceptRequest$(conv_id: string, user?: string) {
        let request = new LiveRequest(conv_id, 'remove', user);
        let options = this.getRequestOptions();
        return this.http.post(this.acceptRequestUrl, request, options).map(res => res.json());
    }

    public getDbRequests$() : Observable<LiveRequest[]> {
        let options = this.getRequestOptions();
        return this.http.get(this.getRequestQueue, options).map(res => res.json());
    }

    public agentAvailable(res: Response): string {
        if (res.json()["available"] != 0) {
            return "Please wait for the next agent";
        }
        if (res.json()["avaialable"] === "error") {
            return "Server error, could not fulfill your request. Please try again";
        }
        return "Agent's are not available at this time. Try again later";

    }



    public getRequestOptions(authToken?: string): RequestOptions {
        //add authorization token for headers sent with remove request if(...)
        return new RequestOptions(new Headers({ 'Content-Type': 'application/json' }));
    }

    public errorMessage() {

    }


}