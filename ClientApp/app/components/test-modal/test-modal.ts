﻿//ng libs
import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
//rxjs libs
import { Observable } from 'rxjs/Observable';
import 'rxjs';

import { HomeComponent } from '../home/home.component';
//services
import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';
import { ChatAuthenticationService } from '../../services/chat-authentication.service';
import { UserService } from '../../services/user.service';
import { StateStorageService } from '../../services/state-storage.service';
import * as uuid from 'uuid/v1';
import { DraggableElementDirective } from './test.directive';


@Component({
    selector: 'test-modal',
    templateUrl: './test-modal.html',
    styleUrls: ['./test-modal.css'],
    providers: [ChatService, ChatConnectionService, ChatAuthenticationService], 
})
export class TestModal implements OnInit, OnDestroy{

    @Output() deleteModal: EventEmitter<boolean>;

    isshowing: boolean = false;
    Messages: string[] = ['Welcome'];

    private myuid: string;
    private directLine;
    private conv_id: string;
    connected: boolean = false;
    defaultVal: string = null;

    constructor(private chatConnectionService: ChatConnectionService, private chatService: ChatService, private authService: ChatAuthenticationService) {
        this.deleteModal = new EventEmitter<boolean>();
        this.myuid = uuid();
    }

    //  .mergeMap(res => this.chatService.receiveBotActivity$(this.directLine))
    ngOnInit() {
        let timer$ = Observable.timer(2000);
        this.authService.getConversationObject$().subscribe(res => {this.conv_id = res['conversationId']});
        let connection$ = this.chatConnectionService.startConnection$();
        connection$.subscribe(res => { console.log(res) });


        /*
        timer$
            .switchMap(() => connection$)
            .subscribe(res => {
                this.directLine = res;
                this.connected = true;
                this.chatService.receiveBotActivity$(this.directLine).map(act => act['text'])
                    .subscribe(res => { this.Messages.push(res) });
                
            });
        */
    }

    ngOnDestroy() {
        
    }


    submitMessage(sendingMessage: string) {
        this.defaultVal = '';
        if (sendingMessage !== '') {
            this.Messages.push(sendingMessage);
            this.chatService.sendMessage(this.directLine, sendingMessage, this.myuid);
        }
    }

    closeModal(): void {
        this.deleteModal.emit(false);
    }







}