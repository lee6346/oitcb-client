
//ang libraries
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Injectable } from '@angular/core';

//Direct Line libraries
import { DirectLine } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';
import { Conversation } from 'botframework-directlinejs';

//rxjs libraries
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


//uid generating service
import * as uuid from 'uuid';
/*
This service is responsible for connection with the chatbot
1. generate and hold tokens and conversation ID
2. start direct line connection
3. reconnect or resume on existing connections
4. get connection state

*/
@Injectable()
export class ChatConnectionService {

    /*This service is used for all direct line api connections, connection states, */
    private mySecret: string = 'Bearer gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs';
    private tokenUri = 'https://directline.botframework.com/v3/directline/tokens/generate';

    private directLine: DirectLine; 
    private conversation: Conversation;

    //note: currently we are making the token generating call in the client using the secret. We will later move the secret to the server
    // and retrieve token by making a call to the server to request a token and send it back to the client
    constructor(private http: Http) {
        this.getConversationObject().subscribe(
            res => {
                this.conversation = res;
                console.log("conversation data: ", this.conversation);
            }
        );

    }

    // create directLine connection 
    
    public startConnection(socket: boolean = true) {
        this.directLine = new DirectLine({
            token: this.conversation.token,
            webSocket: socket,
        });
        return this.directLine;
    }
    
    // restart new directLine connection
    public restartConnection() {
        this.getConversationObject().subscribe(
            res => {
                this.conversation = res;
                console.log("conversation data: ", this.conversation);
            }
        )
        this.directLine.reconnect(this.conversation);
    }


    // resume existing connection (must config websockets for this)
    public resumeConnection() {
        this.directLine = new DirectLine({
            token: this.conversation.token,
            streamUrl: '',
            conversationId: this.conversation.conversationId,
        });
    }

    //http response for POST: /generatetoken
    public getConversationObject() {
        let headers = new Headers({
            'Authorization': this.mySecret
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.tokenUri, undefined, options).map(data => data.json());
    }




    //(later) store the ConversationID inside the local cache in the browser
    public storeConversationId() {

    }

    //(later) get the ConversationID inside the local cache in browser
    public getConversationId() {

    }

    // get the status of the connection
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


    // terminate connection
    public endConnection() {
        this.directLine.end();
    }


    
}
