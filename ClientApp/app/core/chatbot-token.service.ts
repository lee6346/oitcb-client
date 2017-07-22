
//ang libraries
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
//direct line lib
import { Conversation } from 'botframework-directlinejs';
//rxjs lib
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChatBotTokenService {

    constructor(private http: Http) { }


    //returns an observable for a conversation object
    public getConversationObject$(): Observable<Conversation> {

        return this.http.get('/api/ChatToken/GetConversationObject').map(data => data.json());
    }

    // returns an observable of a new security token
    public getSecurityToken$(): Observable<string> {

        return this.getConversationObject$().map(obj => obj.token);

    }

}