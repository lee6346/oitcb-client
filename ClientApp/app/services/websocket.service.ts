
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LiveRequest } from '../model/LiveRequest';

@Injectable()
export class WebsocketService {

    private socketUrl: string = 'ws://localhost:5000/socketconnection';

    
    constructor() {
    }

    public connectWebSocket$(auth?: string) {
        return Rx.Observable.webSocket(this.socketUrl);

    }
    //.resultSelector(e): returns e.data for specified key in the JSON fields
    public socketConnectionError() {

    }

    public connectWebSocketMerge$() {
        return this.mergeDeleter$(this.connectWebSocket$());
    }

    public mergeDeleter$(socket) {
        return socket.merge(new Rx.Subject()).startWith([]).
            scan((acc, val) => {
                if (val.action && val.action === "remove") {
                    var index = acc.findIndex((req) => req.ID === val.ID);
                    acc.splice(index, 1);
                    return acc;
                } else {
                    return acc.concat(val);
                }
            });
               
    }

    



}
