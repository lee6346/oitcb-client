
//ng libs
import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

//rxjs lib
import * as Rx from 'rxjs/Rx';

//models
import { LiveRequest } from '../../../model';
import {LiveRequestService } from '../../../core';

@Component({
    selector: 'pending-list',
    templateUrl: './pending-list.component.html',
    styleUrls: ['./pending-list.component.css'],
})
export class PendingListComponent implements OnInit, OnDestroy, OnChanges {


    private displayList: boolean = true;
    private _liveRequestQueue: LiveRequest[] = [];
    private wsPendingRequests$: Rx.Observable<LiveRequest>;

    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();


    @Input()
    set liveRequestQueue(req: Rx.Observable<LiveRequest>) {
        req.subscribe(res => this.processQueue(res));
        //this.processQueue(req);
    }

    @Output()
    private liveRequestSelect: EventEmitter<LiveRequest>;

    constructor(private liveRequestService: LiveRequestService ) { }

    ngOnInit() {
        this.liveRequestService.getDbRequests$()
            .flatMap(x => x).takeUntil(this.ngUnsubscribe)
            .subscribe(
                res => this._liveRequestQueue.push(res)
            );

    }

    ngOnChanges() { }


    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public getDbPendingRequests(): void {
        this.liveRequestService.getDbRequests$()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(

            );
    }

    public selectPendingRequest(req: LiveRequest) {
        this.liveRequestSelect.emit(req);
    }

    public processQueue(lr: LiveRequest){
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
            this._liveRequestQueue.splice(index, 1);
        }
    }
    public getQueueIndex(id: string): number {
        return this._liveRequestQueue.findIndex(x => x.conv_id === id);
    }

    public addToQueue(lr: LiveRequest){
        if (this.getQueueIndex(lr['conv_id']) === -1)
            this._liveRequestQueue.push(lr);
    }    


}