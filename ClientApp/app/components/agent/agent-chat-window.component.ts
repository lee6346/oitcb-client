import { Component, OnInit, OnDestroy, ElementRef, EventEmitter, Output, Input, Injector } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { DirectLine, ConnectionStatus, IActivity, Activity } from 'botframework-directlinejs';
import { NgStyle, NgClass } from '@angular/common';
import { AgentComponent } from './agent.component';
import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';
import { ChatAuthenticationService } from '../../services/chat-authentication.service';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { DraggableWindowDirective } from './draggable-window.directive';
import { Conversation } from 'botframework-directlinejs';
import * as uuid from 'uuid/v1';

@Component({
    selector: 'agent-chat-window',
    templateUrl: './agent-chat-window.component.html',
    styleUrls: ['./agent-chat-window.component.css'],
    //providers: [WebsocketService]
})
export class AgentChatWindowComponent implements OnInit, OnDestroy {
    /*
    @Output() deleteModal: EventEmitter<boolean>;
    @Input() conv_id: string;
    isshowing: boolean = false;
    Messages: string[] = [];

    private myuid: string;
    private directLine;
    connected: boolean = false;
    defaultVal: string = null;
    */
    private botHandle: string = 'AskRowdy';
    public close = new EventEmitter();
    private conv_id: string;
    private secret: string;
    private directLine: DirectLine; 
    private conversation: Conversation;
    private myuid;
    private defaultVal: string = null;
    private messages: Activity[] = [];
    constructor(private injector: Injector, private chatConnectionService: ChatConnectionService, private chatService: ChatService, private authService: ChatAuthenticationService) {
        //this.deleteModal = new EventEmitter<boolean>();
        this.conv_id = this.injector.get('conv_id');
        this.secret = this.injector.get('secret');
        this.myuid = uuid();
    }
   


    ngOnInit() {
        
        this.authService.getConvStreamUrl(this.conv_id).subscribe(res => {
            this.conversation = res as Conversation;
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