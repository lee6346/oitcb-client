//ng libs
import { Component, OnInit, OnDestroy, EventEmitter, Input} from '@angular/core';


//rxjs libs
import * as Rx from 'rxjs/Rx';

//direct line
import { Activity } from 'botframework-directlinejs';

//services
import { WindowMessageService } from '../../../core';
import { Message } from '../../../model';

//models
import * as uuid from 'uuid/v1';

@Component({
    selector: 'input-bar',
    templateUrl: './input-bar.component.html',
    styleUrls: ['./input-bar.component.css'],
})
export class InputBarComponent implements OnInit, OnDestroy {

    @Input()
    private agentId: string;

    @Input()
    private agentName: string;
    
    private conversationTracker: Rx.Observable<string>;
    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();
    private currentConversationId: string;
    private defaultInput: string = null;

    constructor(private windowMessage: WindowMessageService) { }

    ngOnInit() {
        this.subscribeToConversation();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public subscribeToConversation() {
        this.conversationTracker = this.windowMessage.windowStatusObservable$
            .takeUntil(this.ngUnsubscribe);
        this.conversationTracker.subscribe(res => {
            console.log("input bar current convid: " + res);
            this.currentConversationId = res;
        });
    }

    public sendMessage(msg: string) {
        this.defaultInput = '';
        if (msg !== '') {
            let act = {
                type: 'message',
                conversation: { id: this.currentConversationId },
                from: { id: this.agentId, name: this.agentName },
                text: msg,
            } as Activity;
            console.log("sending message: " + act['text'] + " to " + act.from.id + " at conversation " + act.conversation.id);
            this.windowMessage.messageCurrentWindow(act);
        }
    }

}