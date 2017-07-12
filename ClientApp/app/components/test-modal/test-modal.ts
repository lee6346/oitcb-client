import { Component, OnInit, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs';
//chat services
import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';
//generating uids
import * as uuid from 'uuid/v1';

@Component({
    selector: 'test-modal' ,
    templateUrl: './test-modal.html',
    styleUrls: ['./test-modal.css'],
    providers: [ChatService, ChatConnectionService],
})
export class TestModal implements OnInit, OnDestroy{

    @Output() deleteModal: EventEmitter<boolean>;

    isshowing: boolean = false;
    Messages = ['Welcome'];

    private myuid: string;
    private directLine;
    defaultVal: string = null;

    constructor(private chatConnectionService: ChatConnectionService, private chatService: ChatService ) {
        this.deleteModal = new EventEmitter<boolean>();
        this.myuid = uuid();
    }


    ngOnInit() {
        let timer = Observable.timer(2000);
        timer.subscribe(() => {
            this.directLine = this.chatConnectionService.startConnection();
        });
        
        
    }

    ngOnDestroy() {
        
    }


    submitMessage(sendingMessage: string) {
        this.defaultVal = '';
        if (sendingMessage !== '') {
            this.Messages.push(sendingMessage);
            this.chatService.sendMessage(this.directLine, sendingMessage, this.myuid);
            this.chatService.receiveBotActivity(this.directLine).subscribe(
                res => {
                    this.Messages.push(res);
                    
                }
            );
        }
    }

    closeModal(): void {
        this.deleteModal.emit(false);
    }





}