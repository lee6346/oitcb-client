import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LiveRequest } from '../../model';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class LiveRequestService {

    private liveRequestUrl: string = '/api/AgentTransfer/MakeRequest';
    private acceptRequestUrl: string = '/api/AgentTransfer/AcceptRequest';
    private getRequestQueue: string = '/api/AgentTransfer/GetRequests';
    constructor(private http: Http) { }

    //broadcast live request to available agents/administrators
    //returns status on availability of agent (error = duplicate request)
    public sendLiveRequest$(conv_id: string, user?: string) {

        let request = new LiveRequest(conv_id, 'request', user);
        let options = this.getRequestOptions();
        return this.http.post(this.liveRequestUrl, request, options).map(res => res.json());
    }

    //accept a pending live request and broadcast to remove the request from other agents/administrators
    public acceptRequest$(conv_id: string, user?: string) {
        let request = new LiveRequest(conv_id, 'remove', user);
        let options = this.getRequestOptions();
        return this.http.post(this.acceptRequestUrl, request, options).map(res => res.json());
    }


    //retrieve pending live requests in the db that are not yet fulfilled
    public getDbRequests$() : Rx.Observable<LiveRequest[]> {
        let options = this.getRequestOptions();
        return this.http.get(this.getRequestQueue, options).map(res => res.json());
    }


    //handling json response for status of available agents
    public agentAvailable(res: Response): string {
        if (res.json()["available"] != 0) {
            return "Please wait for the next agent";
        }
        if (res.json()["avaialable"] === "error") {
            return "Server error, could not fulfill your request. Please try again";
        }
        return "Agent's are not available at this time. Try again later";

    }


    // headers/options factory method (need to add JWT or OAuth tokens later)
    public getRequestOptions(authToken?: string): RequestOptions {
        return new RequestOptions(new Headers({ 'Content-Type': 'application/json' }));
    }

    // for handling errors in ws (implement later)
    public errorMessage() {

    }


}