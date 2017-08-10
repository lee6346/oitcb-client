
import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';

import * as Rx from 'rxjs/Rx';

import { LiveRequest } from '../../../model';
import { LiveRequestService, SocketMessageService, WindowMessageService } from '../../../core';


@Component({
    selector: 'pending-list',
    templateUrl: './pending-list.component.html',
    styleUrls: ['./pending-list.component.css'],
})
export class PendingListComponent implements OnInit, OnDestroy{

    @Input()
    private displayList: boolean = true;


    private liveRequestQueue: LiveRequest[] = [];
    private liveRequests$: Rx.Observable<LiveRequest>;

    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();


    @Output()
    private liveRequestSelect: EventEmitter<LiveRequest> = new EventEmitter<LiveRequest>();

    constructor(private liveRequestService: LiveRequestService,
        private socketService: SocketMessageService, private windowService: WindowMessageService
    ) { }

    ngOnInit() {
        this.subscribeToPendingRequests();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public subscribeToPendingRequests() {
        this.liveRequests$ = this.liveRequestService.getDbRequests$()
            .distinct(x => x['conv_id']).flatMap(x => x)
            .concat(this.getJsonObjects$(this.socketService.liveRequestMessage$))
            .takeUntil(this.ngUnsubscribe);
        this.liveRequests$.subscribe(res => this.processQueue(res));
    }

    public selectPendingRequest(req: LiveRequest) {

        this.liveRequestService.acceptRequest$(req.conv_id, req.user).subscribe();
        this.windowService.sendWindowStatus(req['conv_id'] as string);
        console.log("from pending list, sending conv: " + req['conv_id']);
        this.liveRequestSelect.emit(req);
    }

    public processQueue(lr: LiveRequest) {
        if (lr['action'] === 'remove') {
            this.removefromQueue(lr);
        }
        if (lr['action'] === 'request') {
            this.addToQueue(lr);
        }
    }

    public removefromQueue(lr: LiveRequest){
        let index = this.getQueueIndex(lr['conv_id']);
        if (index !== -1) {
            this.liveRequestQueue.splice(index, 1);
        }
    }
    public getQueueIndex(id: string): number {
        return this.liveRequestQueue.findIndex(x => x.conv_id === id);
    }

    public addToQueue(lr: LiveRequest){
        if (this.getQueueIndex(lr['conv_id']) === -1)
            this.liveRequestQueue.push(lr);
    }    

    public getJsonObjects$(ws: Rx.Observable<any>): Rx.Observable<LiveRequest> {
        return ws.map(this.parseResponse);
    }

    public parseResponse(res): LiveRequest {
        return JSON.parse(res['data']) as LiveRequest;
    }
}