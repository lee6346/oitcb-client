import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { LiveRequest } from '../model';

@Injectable()
export class SocketMessageService {

    private socketUrl: string = 'ws://localhost:5000/socketconnection';
    private socket = Rx.Observable.webSocket(this.socketUrl);

    public getSocketLiveRequestMessages$(): Rx.Observable<LiveRequest> {
        return this.socket.asObservable().share();
    }

    
}