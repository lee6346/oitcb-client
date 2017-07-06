import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'chat-modal',
    templateUrl: './chat-modal.component.html'
})
export class ChatModalComponent {
    @ViewChild('chatModal') public chatModal: ModalDirective;


    constructor() {
    
    }
    msg: string;

    public sendMessages(msg: string): void {
        this.msg = msg;
        
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