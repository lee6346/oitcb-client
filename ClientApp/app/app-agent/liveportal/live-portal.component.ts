
//ng libs
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

//rxjs lib
import * as Rx from 'rxjs/Rx';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';

//services
import { WebsocketService } from '../../core';

//models
import { Channel, LiveRequest } from '../../model';


import * as uuid from 'uuid/v1';

//directives/components
import { MinimizeWindowContainerComponent } from './minimizewindow/minimized-window-container.component';
import { InsertWindowDirective } from './directives/insert-window.directive';
import { AgentGroupChatComponent } from './agentgroupchat/agent-group-chat.component';
import { PendingListComponent } from './pendinglist/pending-list.component';
import { WatchListComponent } from './watchlist/watch-list.component';
import { InputBarComponent } from './inputbar/input-bar.component';
import { ChatDisplayWindowComponent } from './chatdisplaywindow/chat-display-window.component';


@Component({
    selector: 'live-portal',
    templateUrl: './live-portal.component.html',
    styleUrls: ['./live-portal.component.css'],

    entryComponents: [ChatDisplayWindowComponent],
})
export class LivePortalComponent implements OnInit, OnDestroy {

    @ViewChild(InsertWindowDirective) windowAnchor: InsertWindowDirective;

    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();
    private myuid: string = uuid();
    private userName: string = 'agent';
    //private ws_connection: Rx.Observable<any>;
    private clickedPending: boolean = true;

    constructor(private ws: WebsocketService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public createChannelDisplay(channel: Channel) {
        console.log(channel);
        this.windowAnchor.createChatWindow(channel['conversationId'], 'watch', this.myuid, ChatDisplayWindowComponent);
    }

    public createRequestDisplay(request: LiveRequest) {
        console.log(request);
        this.windowAnchor.createChatWindow(request['conv_id'], 'chat', this.myuid, ChatDisplayWindowComponent);
    }

    public changeToPending() {
        this.clickedPending = true;
    }

    public changeToChannels() {
        this.clickedPending = false;
    }
    
}