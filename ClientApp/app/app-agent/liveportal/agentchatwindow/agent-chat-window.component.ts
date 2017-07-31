//ng libs
import { Component, OnInit, OnDestroy, EventEmitter, Injector } from '@angular/core';
import { NgClass } from '@angular/common';

//rxjs libs
import * as Rx from 'rxjs/Rx';

//direct line
import { DirectLine, Conversation, Activity } from 'botframework-directlinejs';

//services
import { ChatBotActivityService, ChatBotConnectionService } from '../../../core';
import * as uuid from 'uuid/v1';

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

    constructor(private injector: Injector, private chatConnectionService: ChatBotConnectionService, private chatService: ChatBotActivityService) {
        this.conv_id = this.injector.get('conv_id');
        this.myuid = uuid();
    }



    ngOnInit() {

        this.chatConnectionService.getConvStreamUrl$(this.conv_id).subscribe(res => {
            this.conversation = res as Conversation;
            console.log(this.conversation);
            this.directLine = new DirectLine({
                token: this.conversation['token'],
                conversationId: this.conv_id,
                webSocket: true,
                streamUrl: this.conversation['streamUrl']

            });

            this.directLine.activity$.filter(res => res.from.id !== this.myuid).filter(res => res.from.id !== this.botHandle)
                .subscribe(res => this.messages.push(res));
        });
    }

    ngOnDestroy() {
    }


    public submitMessage(sendingMessage: string) {
        this.defaultVal = '';
        if (sendingMessage !== '') {
            let act = { from: { id: this.myuid }, type: 'message', text: sendingMessage } as Activity;

            this.directLine.postActivity(act).subscribe(
                id => console.log("posted activity, assigned ID ", id),
                error => console.log("Error posting activity", error));
            this.messages.push(act);
        }
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

    onClickedExit() {
        this.close.emit('event');
    }

}