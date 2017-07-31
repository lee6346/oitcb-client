
//ng libs
import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

//rxjs lib
import * as Rx from 'rxjs/Rx';

//models
import { LiveRequest } from '../../../model';


@Component({
    selector: 'pending-list',
    templateUrl: './pending-list.component.html',
    styleUrls: ['./pending-list.component.css'],
})
export class PendingListComponent implements OnInit, OnDestroy, OnChanges {

    //use javascript Set() to get unique conv-ids
   // private lr: Set

    private _liveRequestQueue: LiveRequest[] = [];

    @Input()
    set liveRequestQueue(req: Rx.Observable<LiveRequest>) {
        req.subscribe(res => this.processQueue(res));
        //this.processQueue(req);
    }
    /*
    get liveRequestQueue(){
        return this._liveRequestQueue.pop();
    }
    */
    @Output()
    private liveRequestSelect: EventEmitter<LiveRequest>;

    constructor() { }

    ngOnInit() {

    }

    ngOnChanges() { }


    ngOnDestroy() {
        //this.ngUnsubscribe.next();
        //this.ngUnsubscribe.complete();
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