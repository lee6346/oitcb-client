
import * as Rx from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { LiveRequest } from '../../model/LiveRequest';
import { ISubscription } from "rxjs/Subscription";

import { NotificationBarComponent } from '../../notificationbar/notificationbar.component';


@Component({
    selector: 'agent-home-component',
    templateUrl: './agent-home.component.html',
    styleUrls: ['./agent-home.component.css']
})
export class AgentComponent implements OnInit, OnDestroy {

    private liveQueue: LiveRequest[];
    private sock_id: string;
    private request_obs: Rx.Observable<LiveRequest[]>;
    private mysubscription: ISubscription;
    constructor(private ws: WebsocketService) {
    }
    //public url: string = "ws://localhost:5000/socketconnection";

    ngOnInit() {

    }

    ngOnDestroy() {

    }





}
