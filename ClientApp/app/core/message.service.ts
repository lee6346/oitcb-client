import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Message } from '../model';
import { Activity } from 'botframework-directlinejs';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class MessageService {
    private messageLogUrl: string = '/api/Message/GetActivityLog/';
    private sendActivityUrl: string = '/api/Message/SendMessage';


    constructor(private http: Http) { }

    public getMessageLog(conv_id: string): Rx.Observable<Message[]> {
        return this.http.get(this.messageLogUrl + conv_id, this.getRequestOptions())
            .map(res => res.json());

    }

    public submitMessage(activity: Activity): Rx.Observable<boolean> {
        return this.http.post(this.sendActivityUrl, activity, this.getRequestOptions())
            .map(res => res.json());
    }

    public getRequestOptions(): RequestOptions {
        return new RequestOptions(new Headers({ 'Content-Type': 'application/json' }));
    }


}