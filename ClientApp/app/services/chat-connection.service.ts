﻿
//ang libraries
import { Injectable } from '@angular/core';

//Direct Line libraries
import { DirectLine } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';
import { Conversation } from 'botframework-directlinejs';

//rxjs
import { Observable } from 'rxjs/Observable';

//sevices
import { ChatAuthenticationService } from './chat-authentication.service';
import { StateStorageService } from './state-storage.service';



@Injectable()
export class ChatConnectionService {

    constructor(private chatAuthenticationService: ChatAuthenticationService, private stateStorageService : StateStorageService) { }


    //returns an observable for direct line object
    public startConnection$(socket: boolean = true): Observable<DirectLine> {
        return this.chatAuthenticationService.getConversationObject$().map(
            data => new DirectLine({
                token: data['token'],
                webSocket: socket,
                watermark: null,
            })
        );

    }


    // restart new directLine connection
    public restartConnection(directLine: DirectLine): void {
        this.chatAuthenticationService.getConversationObject$()
            .map(conv => directLine.reconnect(conv));
    }


    // to resume an existing connection: must enable local cache services to store conversation Id
    public resumeConnection$(convId: string, tok: string): Observable<DirectLine> {
        return Observable.of(new DirectLine({
            token: tok,
            conversationId: convId
        }));

    }


    // get the connection status
    public getConnectionStatus(directLine: DirectLine) : Observable<ConnectionStatus> {
        return directLine.connectionStatus$;
    }

    // terminate connection
    public endConnection(directLine : DirectLine) {
        directLine.end();
    }

    
    
}
