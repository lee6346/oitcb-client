import { Component, Input, ViewChild } from '@angular/core';

//ngx bootstrap modal
import { ModalDirective } from 'ngx-bootstrap/modal';

//direct line 3.0 
import { DirectLine } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';

//ng2 life cycle hooks
import { OnInit } from '@angular/core';

//chat connection services
import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';


@Component({
    selector: 'chat-modal',
    templateUrl: './chat-modal.component.html',
})
    
export class ChatModalComponent{
    @ViewChild('chatModal') public chatModal: ModalDirective;


    constructor() {}


    // connect / send message
    public sendMessages(msg: string) {

        
    }

    public receiveMessages(): void {

    }

    public intializeConnection(): void {

    }
    public showChatModal(): void {
        this.chatModal.show();
    }

    public hideChatModal(): void {
        this.chatModal.hide();
    }
}