
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { DirectLine, Conversation } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';

import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';

import * as uuid from 'uuid/v1';


//for testing purposes
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
/*
var conv_uri = 'https://directline.botframework.com/v3/directline/conversations';
// component that renders the home component hmtl when clicking <home> or [route /home]
var conv_id: string;

var channelId: string;

var directLine = new DirectLine({
    secret: 'gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs',
    domain: 'https://directline.botframework.com/v3/directline',
    webSocket: true,
});

*/

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [ChatService, ChatConnectionService],
})
export class HomeComponent {
    
    private myuid: string;
    private directLine: DirectLine;
    @ViewChild('chatModal')
    chatModal: ChatModalComponent;

    constructor(private viewContainerRef: ViewContainerRef, private chatService: ChatService, private chatConnectionService: ChatConnectionService) {
        this.myuid = uuid();
        console.log('test');
        
    }
    doSomething(tt) {

        this.directLine = this.chatConnectionService.startConnection();
        this.chatService.sendMessage(this.directLine, tt, this.myuid);
        this.chatService.receiveActivity(this.directLine);
    }
   



    chatWindow(event) {
        
        window.open(document.URL, '_blank', 'location=yes, height=570, width=520, scrollbars=yes, static=yes');
    }
}
