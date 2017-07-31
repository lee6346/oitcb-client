
//ang libraries
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

//Direct Line libraries
import { DirectLine, Conversation, ConnectionStatus } from 'botframework-directlinejs';

//rxjs
import * as Rx from 'rxjs/Rx';




@Injectable()
export class ChatBotConnectionService {

    constructor(private http: Http) { }

    private refreshUri = "https://directline.botframework.com/v3/directline/tokens/refresh";

    private newConnectionUri = "/api/ChatToken/GetNewConnection/";
    private newTokenUri = "/api/ChatToken/GetConversationObject";


    //returns an observable for a conversation object
    public getConversationObject$(): Rx.Observable<Conversation> {
        return this.http.get('/api/ChatToken/GetConversationObject').map(data => data.json());
    }

    // returns an observable of a new security token
    public getSecurityToken$(): Rx.Observable<string> {
        return this.getConversationObject$().map(obj => obj['token']);
    }


    //refresh token (only available for browsers with cache enabled)
    public refreshToken$(oldToken: string) {
        let headers = new Headers({
            'Authorization': oldToken
        })
    }

    // returns a new stream URL for the conversation id and token to join or resume an existing conversation 
    public getConvStreamUrl$(convId: string) {
        return this.http.get(this.newConnectionUri + convId).map(res => res.json());
    }


    // restart new directLine connection
    public restartConnection(directLine: DirectLine): void {
        this.getConversationObject$()
            .map(conv => directLine.reconnect(conv));
    }

    //generate a direct line object for new or existing conversations
    public startConnection$(conv: Conversation): DirectLine {
        if (conv.streamUrl) {
            return new DirectLine({
                token: conv['token'],
                conversationId: conv['conversationId'],
                webSocket: true,
                streamUrl: conv['streamUrl']
            });
        }
        else {
            return new DirectLine({
                token: conv['token'],
                webSocket: true,
                watermark: null,
            });
        }

    }
    // to resume an existing connection: must enable local cache services to store conversation Id
    public resumeConnection$(convId: string, tok: string): Rx.Observable<DirectLine> {
        return Rx.Observable.of(new DirectLine({
            token: tok,
            conversationId: convId
        }));

    }

    // get the connection status
    public getConnectionStatus(directLine: DirectLine): Rx.Observable<ConnectionStatus> {
        return directLine.connectionStatus$;
    }

    // terminate connection
    public endConnection(directLine: DirectLine) {
        directLine.end();
    }



}
