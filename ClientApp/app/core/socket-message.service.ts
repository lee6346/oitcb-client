import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';
import * as Rx from 'rxjs/Rx';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { LiveRequest, Channel, AgentMessage, CloseChannel } from '../model';

@Injectable()
export class SocketMessageService {

    private socketUrl: string = 'ws://localhost:5000/socketconnection';
    private agentMessageUrl: string = 'api/Agent/SendMessage';
    private socket = Rx.Observable.webSocket(this.socketUrl);




    public liveRequestMessage$: Rx.Observable<LiveRequest> = this.socket.asObservable();
    public channelMessage$: Rx.Observable<Channel> = this.socket.asObservable();
    public agentMessage$: Rx.Observable<AgentMessage> = this.socket.asObservable();


    constructor(private http: Http) { }

    public acceptLiveRequest(request: LiveRequest) {
        this.socket.next(request);
    }
    /*
    public pushAgentMessage(msg: AgentMessage) {
        this.socket.next(msg);
    }
    */
    public pushAgentMessage(msg: AgentMessage) {
        return this.http.post(this.agentMessageUrl, msg, this.getRequestOptions()).map(res => res.json());
    }

    public watchConnection(channel: Channel) {
        this.socket.next(channel);
    }
    public getObservableLiverequest$(ws: Rx.Observable<any>): Rx.Observable<LiveRequest> {
        return ws.map(this.parseSocketLiveRequest);
    }

    public parseSocketLiveRequest(res): LiveRequest {
        return JSON.parse(res['data']) as LiveRequest;
    }

    public parseSocketAgentMessage(res): AgentMessage {
        return JSON.parse(res['data']) as AgentMessage;
    }

    public getRequestOptions(): RequestOptions {
        return new RequestOptions(new Headers({ 'Content-Type': 'application/json' }));
    }

    
}