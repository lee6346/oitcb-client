import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiddenMessage, MinimizedWindow } from '../../../model';
import { WindowMessageService } from '../../../core';

import * as Rx from 'rxjs/Rx';

@Component({
    selector: 'minimized-window-container',
    templateUrl: './minimized-window-container.component.html',
    styleUrls: ['./minimized-window-container.component.css'],
    
})
export class MinimizeWindowContainerComponent implements OnInit, OnDestroy {


    private watchWindowContainer: MinimizedWindow[] = [];
    private chatWindowContainer: MinimizedWindow[] = [];
    private messageObservable: Rx.Observable<HiddenMessage>;

    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();

    constructor(private windowMessageService: WindowMessageService) { }
    
    ngOnInit() {
        this.subscribeToHiddenMessages();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public subscribeToHiddenMessages() {
        this.messageObservable = this.windowMessageService.hiddenMessageObservable$
            .takeUntil(this.ngUnsubscribe);
        this.messageObservable.subscribe(res => {
            console.log('received new hidden: ' + res.conversationId);

            this.processHiddenMessage(res);
        });
    }

    public processHiddenMessage(msg: HiddenMessage) {
        if (msg['channelType'] === 'chat') {
            //console.log('new chat minimized: ' + msg.conversationId);
            this.processChatWindowMessage(msg);
        }
        else if (msg['channelType'] === 'watch'){
            console.log('new watch minimized: ' + msg.conversationId);
            this.processWatchWindowMessage(msg);
        }
    }

    public processChatWindowMessage(msg: HiddenMessage) {
        let index = this.getQueueIndex(msg['conversationId'], this.chatWindowContainer);
        if (index === -1)
            this.chatWindowContainer.push({ conversationId: msg.conversationId, messages: 0} as MinimizedWindow);
        else 
            this.chatWindowContainer[index].messages += 1;

    }

    public processWatchWindowMessage(msg: HiddenMessage) {
        let index = this.getQueueIndex(msg['conversationId'], this.watchWindowContainer);

        if (index === -1)
            this.watchWindowContainer.push({ conversationId: msg.conversationId, messages: 0 } as MinimizedWindow);
        else if(msg['liveRequest'] == true)
            this.watchWindowContainer[index].messages += 1;
        else
            this.watchWindowContainer[index].messages += 1;
    }

    public getQueueIndex(id: string, arr: MinimizedWindow[]) {
        return arr.findIndex(x => x['conversationId'] === id);
    }

    public selectMinimizedChatWindow(minWindow: MinimizedWindow) {
        let index = this.getQueueIndex(minWindow['conversationId'], this.chatWindowContainer);
        if (index !== -1) {
            this.chatWindowContainer.splice(index, 1);
            this.windowMessageService.sendWindowStatus(minWindow['conversationId']);
        }
        
    }
    public selectMinimizedWatchWindow(minWindow: MinimizedWindow) {
        let index = this.getQueueIndex(minWindow['conversationId'], this.watchWindowContainer);
        if (index !== -1) {
            this.watchWindowContainer.splice(index, 1);
            this.windowMessageService.sendWindowStatus(minWindow['conversationId']);
        }
    }

}