
//ang libraries
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
//Direct Line libraries
import { DirectLine } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';
import { Conversation } from 'botframework-directlinejs';
//rxjs libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class ChatConnectionService {

    /*This service is used for all direct line api connections, connection states, */
    private mySecret: string = 'gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs';

    private directLine: DirectLine = new DirectLine({
        secret: this.mySecret,
        webSocket: true,
    });

    
    /* Use this when we configure the secret -> token auth
    
    private directLine: DirectLine;
    private mytoken: string;

    constructor(http: Http){
        mytoken = this.http.get(url on server that invokes the token request and sends back).
                            .map(this.extractData)
                            .catch(this.handleError);
        directLine = new DirectLine({
            token: mytoken,
            webSocket: true,
        });
    }
    */

    //use inside the constructor when we configure the secret to be stored in the server securely with an api end point 
   // constructor(http: Http, res: Response, error: Response |  any) {
        /*my_secret = this.http.get('url for webserver')
                              .map(res.json().data);
        directLine = new DirectLine({
            secret: this.mySecret,
            webSocket: true }); */
    //}

    // get the static of the connection
    public getConnectionStatus() {
        return this.directLine.connectionStatus$
            .subscribe(connectionStatus => {
                switch (connectionStatus) {
                    case ConnectionStatus.Uninitialized: "Connection hasn't started";
                        break;
                    case ConnectionStatus.Connecting: "Connection in progress";
                        break;
                    case ConnectionStatus.Online: "Successfully connected";
                        break;
                    case ConnectionStatus.ExpiredToken: "Token has expired, please renew token";
                        break;
                    case ConnectionStatus.FailedToConnect: "Connection Error";
                        break;
                    case ConnectionStatus.Ended: "Connection closed, chat ended";
                        break;
                }
            });
    }
    // takes a new conversation object to reconnect to the chatbot
    public reconnectToChatBot(conversation: Conversation) {
        this.directLine.reconnect(conversation);
        
    }

    // use to resome a conversation rather than starting over
    // note: this uses the secret
    public resumeConversationWithSecret(conv_id : string) {
        this.directLine = new DirectLine({
            secret: this.mySecret,
            conversationId: conv_id,
        });
    }
    // will be used when we configure tokens
    // note: we gain access to stream URL when we make a websocket: true request, and get a response
    public resumeConversationWithToken(conv_id: string) {
        this.directLine = new DirectLine({
            token: '',
            streamUrl: '',
            conversationId: conv_id,
        });
    }
    // terminate connection
    public endConnection() {
        this.directLine.end();
    }


    
}
