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
import { UserService } from '../../services/user.service';
import { StateStorageService } from '../../services/state-storage.service';
import * as uuid from 'uuid/v1';

@Component({
    selector: 'test-modal',
    templateUrl: './test-modal.html',
    styleUrls: ['./test-modal.css'],
    providers: [ChatService, ChatConnectionService], 
})
export class TestModal implements OnInit, OnDestroy{

    @Output() deleteModal: EventEmitter<boolean>;

    isshowing: boolean = false;
    Messages: string[] = ['Welcome'];

    private myuid: string;
    private directLine;

    connected: boolean = false;
    defaultVal: string = null;

    constructor(private chatConnectionService: ChatConnectionService, private chatService: ChatService) {
        this.deleteModal = new EventEmitter<boolean>();
        this.myuid = uuid();
    }

    //  .mergeMap(res => this.chatService.receiveBotActivity$(this.directLine))
    ngOnInit() {
        let timer$ = Observable.timer(2000);
        let connection$ = this.chatConnectionService.startConnection$();

        timer$
            .switchMap(() => connection$)
            .subscribe(res => {
                this.directLine = res;
                this.connected = true;
                this.chatService.receiveBotActivity$(this.directLine).map(act => act['text'])
                    .subscribe(res => { this.Messages.push(res) });
                
            });
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