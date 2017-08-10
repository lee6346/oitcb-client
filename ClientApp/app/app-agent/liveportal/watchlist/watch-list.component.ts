
//ng libs
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

//rxjs lib
import * as Rx from 'rxjs/Rx';

//models
import { Channel, HiddenMessage, LiveRequest } from '../../../model';
import { SocketMessageService, ChannelConnectionService, WindowMessageService } from '../../../core';

@Component({
    selector: 'watch-list',
    templateUrl: './watch-list.component.html',
    styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit, OnDestroy {



    @Input()
    private displayChannels: boolean = false;

    @Output()
    private openChannelSelect: EventEmitter<Channel> = new EventEmitter<Channel>();

    private openChannelQueue: Channel[] = [];
    private channelObservable: Rx.Observable<Channel>;
    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();



    constructor(private socketMessage: SocketMessageService,
        private channelConnection: ChannelConnectionService,
        private windowService: WindowMessageService)
    {
    }

    ngOnInit() {
        this.subscribeToOpenChannels();
        this.subscribeLiveRequestChange();

    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public subscribeToOpenChannels() {
        this.channelObservable = this.channelConnection.getOpenChannels$()
            .distinct(el => el['conversationId'])
            .flatMap(x => x).concat(this.getJsonObjects$(this.socketMessage.channelMessage$))
            .takeUntil(this.ngUnsubscribe);
        this.channelObservable.subscribe(res => {
            this.processQueue(res);
        });
    }
    //when user hits live request, should remove from this list to prevent duplicates
    public subscribeLiveRequestChange() {
        this.socketMessage.liveRequestMessage$.filter(res => res['messageType'] === 0)
            .map(res => this.socketMessage.parseSocketLiveRequest(res))
            .takeUntil(this.ngUnsubscribe).subscribe(res => {
                this.removeFromLiveRequests(res);
            });
    }

    public removeFromLiveRequests(req: LiveRequest) {
        if (req['action'] === 'request') {
            let index = this.getQueueIndex(req['conv_id']);
            if (index !== -1) {
                this.openChannelQueue.splice(index, 1);
            }
        }
    }


    public watchChannel(channel: Channel) {
        this.windowService.sendWindowStatus(channel['conversationId'] as string);
        this.openChannelSelect.emit(channel);
        this.removefromQueue(channel);
    }

    public processQueue(ch: Channel) {
        if (ch['channelStatus'] === 'closed') {
            this.removefromQueue(ch);
        }
        if (ch['channelStatus'] === 'opened') {
            this.addToQueue(ch);
        }
    }


    public removefromQueue(channel: Channel){
        let index = this.getQueueIndex(channel['conversationId']);
        if (index !== -1) {
            this.openChannelQueue.splice(index, 1);
        }
    }

    public addToQueue(channel: Channel): void {

        if (this.openChannelQueue || (this.getQueueIndex(channel['conversationId']) === -1))
            this.openChannelQueue.push(channel);
    }

    public getQueueIndex(id: string): number {
        return this.openChannelQueue.findIndex(x => x['conversationId'] === id);
    }

    public getJsonObjects$(ws: Rx.Observable<any>): Rx.Observable<Channel> {
        return ws.map(this.parseResponse);
    }

    public parseResponse(res): Channel {
        return JSON.parse(res['data']) as Channel;
    }



}