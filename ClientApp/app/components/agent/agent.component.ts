
import * as Rx from 'rxjs/Rx';
import { Component , Directive, OnInit, OnDestroy, ElementRef, ViewChildren, ViewChild} from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { LiveRequestService } from '../../services/live-request.service';
import { LiveRequest } from '../../model/LiveRequest';
import { ISubscription } from "rxjs/Subscription";
import { PendingRequestComponent } from './pendrequest.component';
import { DatePipe } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { ChatAuthenticationService } from '../../services/chat-authentication.service';
import { ChatConnectionService } from '../../services/chat-connection.service';
import { DraggableWindowDirective } from './draggable-window.directive';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { AgentChatWindowComponent } from './agent-chat-window.component';
import { InsertWindowDirective } from './insert-window.directive';


@Component({
    selector: 'agent',
    templateUrl: './agent.component.html',
    styleUrls: ['./agent.component.css'],
    
    entryComponents:[AgentChatWindowComponent],
})
export class AgentComponent implements OnInit, OnDestroy {

    @ViewChild(InsertWindowDirective) windowAnchor: InsertWindowDirective;

    private liveQueue: LiveRequest[];
    private sock_id: string;
    private wssubscription: ISubscription;
    private dbsubscription: ISubscription;
    
    private ws_connection: Rx.Observable<any>;
    private ws_remove: Rx.Observable<LiveRequest>;
    private ws_add: Rx.Observable<LiveRequest>;

    constructor(private ws: WebsocketService, private lr: LiveRequestService, private auth: ChatAuthenticationService,
        private conn: ChatConnectionService, private chat: ChatService) {
    }
    
    ngOnInit() {
        console.log("in");

        

        //get pending requests in db
        this.lr.getDbRequests$().distinct().subscribe(res => this.liveQueue = res);

        //connect to ws and get socket id
        this.ws_connection = this.ws.connectWebSocket$();
        this.ws_connection.take(1).subscribe(res => { this.sock_id = res['data'], console.log(this.sock_id) });


   
        //set of observers for adding/removing requests
        this.getJsonObjects$(this.ws_connection).filter(x => x['action'] === 'request').subscribe(res => { this.addToQueue(res) });
        this.getJsonObjects$(this.ws_connection).filter(x => x['action'] === 'remove').subscribe(res => { this.removefromQueue(res) });
        //this.lr.getDbRequests$().mergeMap(ob => ob).concat(this.getJsonObjects$(this.ws_connection)).toArray().subscribe(res => console.log(res));


    }

    ngOnDestroy() {

    }

    public removefromQueue(lr: LiveRequest): void {
        let index = this.getQueueIndex(lr['conv_id']);
        if (index !== -1) {
            this.liveQueue.splice(index, 1);
        }
    }

    public addToQueue(lr: LiveRequest): void {
        if (this.getQueueIndex(lr['conv_id']) === -1)
            this.liveQueue.push(lr);
    }

    public getQueueIndex(id: string): number {
        return this.liveQueue.findIndex(x => x.conv_id === id);
    }

    public getJsonObjects$(ws: Rx.Observable<any>): Rx.Observable<LiveRequest> {
        return ws.skip(1).map(this.parseResponse);
    }

    public parseResponse(res): LiveRequest {
        return JSON.parse(res['data']) as LiveRequest;
    }


    public remove() {
        this.liveQueue.splice(4,1);
        
    }

    public acceptRequest(live: LiveRequest): void {
        console.log(live['conv_id']);
        this.lr.acceptRequest$(live['conv_id']).subscribe(res => { console.log(res) });
        this.windowAnchor.createChatWindow(live['conv_id'], this.auth.getSecret(), AgentChatWindowComponent);
    }

}