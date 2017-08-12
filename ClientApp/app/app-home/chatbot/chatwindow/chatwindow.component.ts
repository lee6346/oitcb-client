//ng libs
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

//rxjs lib
import * as Rx from 'rxjs/Rx';

//direct line lib
import {DirectLine, Activity, Message, Conversation } from 'botframework-directlinejs';

//services
import { ChatBotActivityService, ChatBotConnectionService, LiveRequestService, ChannelConnectionService, MessageService } from '../../../core';

//models
import { LiveRequest, LiveStatus } from '../../../model';



//uid lib
import * as uuid from 'uuid/v1';



@Component({
    selector: 'chat-window',
    templateUrl: './chatwindow.component.html',
    styleUrls: ['./chatwindow.component.css'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {

    @Output() removeWindow: EventEmitter<boolean>;


    private Messages: Activity[] = [];

    private myuid: string;
    private userName: string = 'student';
    private defaultVal: string = null;

    private directLine: DirectLine;
    private conversationObject: Conversation;
    private notConnected: boolean = true;
    private agentConnected: boolean = false;


    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();
    private botUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();

    private messageObservableActivity$: Rx.Observable<Activity>;

    
    private waitingActivity: Activity = { from: { id: 'Default' }, type: 'message', text: 'Waiting For Agent, Please Hold' };
    private unavailableActivity: Activity = { from: { id: 'Default' }, type: 'message', text: 'There are currently no agents available' };
    private availableActivity: Activity = { from: { id: 'Default' }, type: 'message', text: 'You are now disconnecting with the bot. An agent will be with you shortly' };
    private closeConnectionActivity: Activity = { from: { id: 'Default' }, type: 'message', text: 'The agent has closed the connection' };

    constructor(private chatService: ChatBotActivityService, private liveService: LiveRequestService,
        private channelConnectionService: ChannelConnectionService,
        private messageService: MessageService
    ) {
        this.removeWindow = new EventEmitter<boolean>();
        this.myuid = uuid();
    }

    ngOnInit() {

        this.channelConnectionService.openChannel$().takeUntil(this.ngUnsubscribe).subscribe(res => {
            this.conversationObject = res;
            this.directLine = this.chatService.getDirectLine(this.conversationObject);
            this.messageObservableActivity$ = this.directLine.activity$.share();
            this.notConnected = false;

            this.messageObservableActivity$.filter(x => x.type === "message")
                .subscribe(res => this.storeMessages(res));
            this.messageObservableActivity$.filter(x => x.from.id === "AskRowdy" && x.type==="message")
                .takeUntil(this.botUnsubscribe).subscribe(res => this.Messages.push(res));
        })
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.botUnsubscribe.next();
        this.botUnsubscribe.complete();
    }
    public storeMessages(act: Activity) {
        this.messageService.submitMessage(act).subscribe();
    }
    
    public submitMessage(sendingMessage: string) {
        this.defaultVal = '';
        if (sendingMessage !== '') {
            let act = { from: { id: this.myuid, name: this.userName }, type: 'message', text: sendingMessage } as Activity;
            this.chatService.sendMessage(this.directLine, act);
            this.Messages.push(act);
        }
    }

    public subScribeToCloseConnection() {
        this.messageObservableActivity$.filter(x => x.type === 'event' && x.name === 'closeConnection')
            .take(1).subscribe(res => {
                console.log("Agent has closed connection");
            });
    }

    public closeWindow(): void {
        this.liveService.acceptRequest$(this.conversationObject.conversationId, this.myuid).subscribe(res => console.log(res));
        this.chatService.sendCloseConnectionEvent(this.directLine, this.conversationObject.conversationId, 'student');
        this.channelConnectionService.closeChannel$(this.conversationObject.conversationId)
            .subscribe(res => { this.removeWindow.emit(false), console.log(res) });
        
    }

    public makeLiveRequest() {
        if (!this.agentConnected) {
            this.liveService.sendLiveRequest$(this.conversationObject.conversationId, this.myuid)
                .subscribe(res => {
                    this.agentStatusHandler(res)
                });
        }
    }
    
    public agentStatusHandler(response: LiveStatus) {
        if (response.liveStatus === 'waiting') {
            this.Messages.push(this.waitingActivity);
        }
        else if (response.liveStatus === 'unavailable') {
            this.Messages.push(this.unavailableActivity);
        }
        else if (response.liveStatus === 'available') {
            this.agentConnected = true;
            this.Messages.push(this.availableActivity);
            this.messageObservableActivity$.filter(x => x.from.id !== this.myuid && x.from.id !== "AskRowdy" && x.type === "message")
                .subscribe(res => this.procMessages(res));
            console.log('here i am')
            this.botUnsubscribe.next();
            this.botUnsubscribe.complete();

        }
    }

    public procMessages(act: Activity) {
        console.log('here i am');
        if (act['from']['id'] === 'closeConnection') {
            act['text'] = 'Agent has closed the connection';

            console.log(act.id);
            this.Messages.push(act);
        }
        else {
            this.Messages.push(act);
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
        else if (id === 'closeConnection') {
            return {
                'align-window-right': true,
                'default-bubble':true,
            }
        }
        else return {
            'align-window-left': true,
            'remote-bubble': true,
        };
    }
    public minimizeWindow() {

    }








}