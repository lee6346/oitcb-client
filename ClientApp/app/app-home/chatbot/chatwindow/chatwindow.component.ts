//ng libs
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

//rxjs lib
import * as Rx from 'rxjs/Rx';
import { ISubscription } from "rxjs/Subscription";

//direct line lib
import { DirectLine, Activity, Conversation } from 'botframework-directlinejs';

//services
import { ChatBotActivityService, ChatBotConnectionService, LiveRequestService } from '../../../core';

//uid lib
import * as uuid from 'uuid/v1';



@Component({
    selector: 'chat-window',
    templateUrl: './chatwindow.component.html',
    styleUrls: ['./chatwindow.component.css'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {

    @Output() removeWindow: EventEmitter<boolean>;


    Messages: Activity[] = [];

    private myuid: string;
    private directLine: DirectLine;
    private conv_id: string;
    private defaultVal: string = null;
    private conv: Conversation;
    private botSubscription: ISubscription;
    private botHandle: string = 'AskRowdy';
    private notConnected: boolean = true;

    constructor(private chatConnectionService: ChatBotConnectionService, private chatService: ChatBotActivityService,
        private liveService: LiveRequestService) {
        this.removeWindow = new EventEmitter<boolean>();
        this.myuid = uuid();
    }

    ngOnInit() {
        let timer$ = Rx.Observable.timer(6000);
        let timer2$ = Rx.Observable.timer(2000);
        timer2$.switchMap(() =>
            this.chatConnectionService.getConversationObject$()).subscribe(res => {
                this.conv = res;
                this.conv_id = res['conversationId'];
                console.log(res);
                this.directLine = this.chatConnectionService.startConnection$(res);
                this.notConnected = false;

            });
        this.botSubscription = timer$
            .switchMap(() => this.directLine.activity$)
            .filter(res => res.from.id !== this.myuid)
            .subscribe(res => { this.Messages.push(res) });

    }

    ngOnDestroy() {

    }


    submitMessage(sendingMessage: string) {
        this.defaultVal = '';
        if (sendingMessage !== '') {
            let act = { from: { id: this.myuid }, type: 'message', text: sendingMessage } as Activity;

            this.directLine.postActivity(act).subscribe(
                id => console.log("posted activity, assigned ID ", id),
                error => console.log("Error posting activity", error));
            this.Messages.push(act);
        }
    }

    closeWindow(): void {
        this.removeWindow.emit(false);
    }
    public makeLiveRequest() {
        console.log(this.conv_id);
        this.liveService.sendLiveRequest$(this.conv_id).subscribe(msg => { console.log(msg) });
        this.botSubscription.unsubscribe();
        this.directLine.activity$.filter(res => res.from.id !== this.myuid).filter(res => res.from.id !== this.botHandle)
            .subscribe(res => { this.Messages.push(res) });

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
    public minimizeWindow() {

    }








}