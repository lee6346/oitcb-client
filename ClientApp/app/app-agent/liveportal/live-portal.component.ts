
//ng libs
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

//rxjs lib
import * as Rx from 'rxjs/Rx';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { ISubscription } from "rxjs/Subscription";

//services
import { WebsocketService, LiveRequestService } from '../../core';

//models
import { LiveRequest } from '../../model';


import * as uuid from 'uuid/v1';

//directives/components
import { AgentChatWindowComponent } from './agentchatwindow/agent-chat-window.component';
import { MinimizeWindowContainerComponent } from './minimizewindow/minimized-window-container.component';
import { InsertWindowDirective } from './directives/insert-window.directive';


@Component({
    selector: 'live-portal',
    templateUrl: './live-portal.component.html',
    styleUrls: ['./live-portal.component.css'],

    entryComponents: [AgentChatWindowComponent],
})
export class LivePortalComponent implements OnInit, OnDestroy {

    @ViewChild(InsertWindowDirective) windowAnchor: InsertWindowDirective;

    private liveQueue: LiveRequest[] = [];
    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();
    private myuid;
    private sock_id: string;

    private ws_connection: Rx.Observable<any>;
    private lr_request: Rx.Observable<LiveRequest>;

    constructor(private ws: WebsocketService, private lr: LiveRequestService) {
        this.myuid = uuid();
    }

    ngOnInit() {

        //get pending requests in db
        this.lr.getDbRequests$().flatMap(x => x).subscribe(res => this.addToQueue(res));

        //connect to ws and get socket id
        this.ws_connection = this.ws.connectWebSocket$();
        this.ws_connection.take(1).subscribe(res => { this.sock_id = res['data'], console.log(this.sock_id) });
        

        
        //set of observers for adding/removing requests
        this.getJsonObjects$(this.ws_connection).filter(x => x['action'] === 'request').subscribe(res => { this.addToQueue(res) });
        this.getJsonObjects$(this.ws_connection).filter(x => x['action'] === 'remove').subscribe(res => { this.removefromQueue(res) });

    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    
    public removefromQueue(lr: LiveRequest): void {
        let index = this.getQueueIndex(lr['conv_id']);
        if (index !== -1) {
            this.liveQueue.splice(index, 1);
        }
    }

    public addToQueue(lr: LiveRequest): void {
       
        if (this.liveQueue || (this.getQueueIndex(lr['conv_id']) === -1))
            this.liveQueue.push(lr);
        
    }

    public getQueueIndex(id: string): number {
        return this.liveQueue.findIndex(x => x['conv_id'] === id);
    }
    
    public getJsonObjects$(ws: Rx.Observable<any>): Rx.Observable<LiveRequest> {
        return ws.skip(1).map(this.parseResponse);
    }

    public parseResponse(res): LiveRequest {
        return JSON.parse(res['data']) as LiveRequest;
    }
    
    public acceptRequest(live: LiveRequest): void {
        console.log(live['conv_id']);

        this.lr.acceptRequest$(live['conv_id'], this.myuid).subscribe(res => { console.log(res) });
        this.windowAnchor.createChatWindow(live['conv_id'], AgentChatWindowComponent);
    }
    
}