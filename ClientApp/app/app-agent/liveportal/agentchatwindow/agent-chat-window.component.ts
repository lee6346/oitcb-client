//ng libs
import { Component, OnInit, OnDestroy, EventEmitter, Injector } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

//rxjs libs
import * as Rx from 'rxjs/Rx';

//direct line
import { DirectLine, Conversation, Activity } from 'botframework-directlinejs';

//services
import { ChatBotActivityService, ChatBotConnectionService, WindowMessageService} from '../../../core';

//models
import * as uuid from 'uuid/v1';


//child components
import { ChatHistoryWindowComponent } from '../chathistorywindow/chat-history-window.component';

@Component({
    selector: 'agent-chat-window',
    templateUrl: './agent-chat-window.component.html',
    styleUrls: ['./agent-chat-window.component.css'],
})
export class AgentChatWindowComponent implements OnInit, OnDestroy {

    private botHandle: string = 'AskRowdy';
    public close = new EventEmitter();
    private conv_id: string;
    private directLine: DirectLine;
    private conversation: Conversation;
    private myuid;
    private defaultVal: string = null;
    private messages: Activity[] = [];

    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();
    private isMinimized: boolean = false;

    constructor(private injector: Injector, private chatConnectionService: ChatBotConnectionService,
        private chatService: ChatBotActivityService, private windowMessageService: WindowMessageService) {
        this.conv_id = this.injector.get('conv_id');
        this.myuid = uuid();
    }



    ngOnInit() {
        
        this.chatConnectionService.getConvStreamUrl$(this.conv_id).subscribe(res => {
            this.conversation = res as Conversation;
            this.directLine = this.chatService.getDirectLine(this.conversation);
            this.directLine.activity$.filter(res => res.from.id !== this.myuid)
                .filter(res => res.from.id !== this.botHandle)
                .takeUntil(this.ngUnsubscribe)
                .subscribe(res => {
                    this.messages.push(res);
                });
        });

    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    public subscribeToActivities(dl: DirectLine) {
        dl.activity$.filter(res => res.from.id !== this.botHandle && res.from.id !== this.myuid)
            .takeUntil(this.ngUnsubscribe)
    }

    public submitMessage(sendingMessage: string) {
        this.defaultVal = '';
        if (sendingMessage !== '') {
            let act = { from: { id: this.myuid }, type: 'message', text: sendingMessage } as Activity;
            //where is where we shall make an httpcall to store my activity in db
            this.directLine.postActivity(act).takeUntil(this.ngUnsubscribe).subscribe(
                id => console.log("posted activity, assigned ID ", id),
                error => console.log("Error posting activity", error));
            this.messages.push(act);
        }
    }


    public restoreChatWindow(id: string) {
        if (id === this.conv_id && this.isMinimized == true)
            this.isMinimized = false;
    }

    public minimizeWindow() {
        this.isMinimized = true;
    }

    //data emitted should be the conversation object emitted to the parent so they can make http call to db with it to modify connection table
    public onClickedExit() {
        this.close.emit('event');
    }

    public msgAlignment(id: string) {
        if (id === this.myuid) {
            return {
                'align-window-right': true,
            };
        }
        else return {
            'align-window-left': true,
        };
    }

    public bubbleProperties(id: string) {
        if (id === this.myuid) {
            return {
                'align-window-right': true,
                'host-bubble': true,
            };
        }
        else return {
            'align-window-left': true,
            'remote-bubble': true,
        };
    }



}