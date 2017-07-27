
//ang libraries
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
//direct line lib
import { Conversation } from 'botframework-directlinejs';
//rxjs lib
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChatAuthenticationService {

    private mySecret: string = 'Bearer gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs';
    private tokenUri = 'https://directline.botframework.com/v3/directline/tokens/generate';
    private refreshUri = "https://directline.botframework.com/v3/directline/tokens/refresh";
    private joinUri = "https://directline.botframework.com/v3/directline/conversations/";
    constructor(private http: Http) { }


    //returns an observable for a conversation object
    public getConversationObject$(): Observable<Conversation> {
        
        let headers = new Headers({
            'Authorization': this.mySecret
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.tokenUri, undefined, options).map(data => data.json());
        
        //return this.http.get('/api/ChatToken/GetConversationObject').map(data => data.json());
    }

    // returns an observable of a new security token
    public getSecurityToken$(): Observable<string> {

        return this.getConversationObject$().map(obj => obj.token);

    }

    public refreshToken$(oldToken: string) {
        let headers = new Headers({
            'Authorization': oldToken
        })
    }

    public getSecret() {
        return this.mySecret;
    }

    public getConvStreamUrl(convId: string) {
        let headers = new Headers({
            'Authorization': this.mySecret
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.joinUri + convId, options).map(res => res.json());
    }

}