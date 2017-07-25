//ng libs
import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, Output, Input, Pipe, ElementRef } from '@angular/core';

//rxjs libs
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
import * as Rx from 'rxjs/Rx';
//my libs
import { LiveRequestService } from '../../services/live-request.service';
import { LiveRequest } from '../../model/LiveRequest';
import { WebsocketService } from '../../services/websocket.service';
import { StateStorageService } from '../../services/state-storage.service';

@Component({
    selector: "pend-bar",
    templateUrl: "./pendrequest.component.html",
    styleUrls: ['./pendrequest.component.css']
})
export class PendingRequestComponent implements OnInit, OnDestroy, OnChanges {

    public requests: LiveRequest[] = [];

    private request_obs: Rx.Observable<LiveRequest[]>;
    private sock_id: string;
    public isDisplayed: boolean;
    private isLoading: boolean;
    private dbsubscriber: ISubscription;
    private wsSubscriber: ISubscription;

    @Output() onAccepted = new EventEmitter<string>();
    @Input() tabon: boolean = true;
    private msg: string[] = [];
    constructor(private liveRequestService: LiveRequestService, private webSocketService: WebsocketService,
        private stateStorageService: StateStorageService, private elref: ElementRef) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.isDisplayed = true;
        console.log("at agent");
        //this.request_obs = this.liveRequestService.getDbRequests$();
        
        this.dbsubscriber = this.liveRequestService.getDbRequests$().map(res => res['conv_id'])
            .subscribe(res => { this.msg.push[res], console.log(res) });
        this.request_obs = this.webSocketService.connectWebSocket$();

        this.request_obs.first().subscribe(res => { this.sock_id = res["data"], this.stateStorageService.storeSocketId(this.sock_id) });

        this.wsSubscriber = this.webSocketService.mergeDeleter$(this.request_obs.skip(1)).map(res => res['conv_id'])
            .subscribe(res => { this.msg.push[res] });
    }

    ngOnDestroy() {
        //this.dbsubscriber.unsubscribe();
        //still have to find out if we should remain subscribed depending on the module
        //this.wsSubscriber.unsubscribe();
    }

    ngOnChanges(changes: any): void {
        if (changes['requests']) {
            this.requests.push
        }
  

    }
    /*
    public openBar(): void {
        this.isDisplayed = true;
        this.elref.nativeElement.getId("mySidenav").style.width = "250px";


    }

    

    public closeBar(): void {
        this.isDisplayed = false;
        this.elref.nativeElement.getId("mySidenav").style.width = "0x";

    }

    */
    public acceptRequest(convId: string) {
        this.liveRequestService.acceptRequest$(convId).subscribe(e => console.log(e));
        this.onAccepted.emit(convId);
    }
}