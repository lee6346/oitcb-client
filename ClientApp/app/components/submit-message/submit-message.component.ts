import { Component } from '@angular/core';

@Component({
    selector: 'submit-message',
    templateUrl: './submit-message.component.html',
    styleUrls: ['./submit-message.component.css']
})
export class SubmitMessageComponent {

    private sent_msg: string;
    private received_msg: string;
    // inject the services to send message
    constructor() { }

    //lifecycle hook

    //method invoked on a click
    sendMessage(msg: string) {
        this.sent_msg = msg;

    }
}