import { Component, Input, Output, EventEmitter } from '@angular/core';


//ng2 life cycle hooks
import { OnInit, OnChanges, OnDestroy } from '@angular/core';

//direct line 3.0 
import { DirectLine, ConnectionStatus } from 'botframework-directlinejs';

//chat connection services
import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';


@Component({
    selector: 'chat-modal',
    templateUrl: './chat-modal.component.html',
    styleUrls: ['/chat-modal.component.css'],
})
 
export class ChatModalComponent implements OnInit, OnDestroy{
    //This class is responsible for making initial connection, loading child components (text/display)
    //and closing when user ends connection

    @Output() deleteModal: EventEmitter<boolean>;


    constructor() {
        this.deleteModal = new EventEmitter<boolean>();
    }

    ngOnInit() {
        window.alert("initialized");
    }

    ngOnDestroy() {
        window.alert("removed");
    }

    closeModal() {
        this.deleteModal.emit(false);
    }

    // connect / send message
    public sendMessages(msg: string) {

        
    }

    public receiveMessages(): void {

    }

    public intializeConnection(): void {

    }

}