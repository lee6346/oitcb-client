//ng libs
import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, Output, Input, Pipe } from '@angular/core';

//rxjs libs
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
import * as Rx from 'rxjs/Rx';
//my libs
import { LiveRequestService } from '../core/live-request.service';
import { LiveRequest } from '../model/LiveRequest';
import { WebsocketService } from '../core/websocket.service';

@Component({
    selector: "notification-bar",
    templateUrl: "./notification-bar.component.html",
    styleUrls: ['notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit, OnDestroy, OnChanges{

    public requests: LiveRequest[] = [];

    private request_obs: Rx.Observable<LiveRequest[]>;
    private sock_id: string;
    private isDisplayed: boolean;
    private isLoading: boolean;
    private dbsubscriber: ISubscription;
    private wsSubscriber: ISubscription;
    
    @Output() onAccepted = new EventEmitter<string>();


    constructor(private liveRequestService : LiveRequestService, private webSocketService: WebsocketService) {
    }
    
    ngOnInit() {
        this.isLoading = true;
        this.isDisplayed = true;
        this.dbsubscriber = this.liveRequestService.getDbRequests$()
            .subscribe(res => this.requests = res);
        this.request_obs = this.webSocketService.connectWebSocket$();

        this.request_obs.first().subscribe(res => { this.sock_id = res["data"] });

        this.wsSubscriber = this.webSocketService.mergeDeleter$(this.request_obs.skip(1))
            .subscribe(res => { this.requests = res });
    }

    ngOnDestroy() {
        this.dbsubscriber.unsubscribe();
        //still have to find out if we should remain subscribed depending on the module
        this.wsSubscriber.unsubscribe();
    }
    
    ngOnChanges(changes: any): void {
        if (changes['requests']) {
            this.requests.push
        }
        
    }

    public openBar(): void{
        this.isDisplayed = true;

    }

    public closeBar(): void {
        this.isDisplayed = false;
    }
   

    public acceptRequest(convId: string) {
        this.liveRequestService.acceptRequest$(convId).subscribe(e => console.log(e));
        this.onAccepted.emit(convId);
    }
}