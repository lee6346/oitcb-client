
import { Component } from '@angular/core';



@Component({
    selector: 'chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css'],
})
export class ChatBotComponent {
    public chatDisplayed: boolean = false;

    constructor() {

    }
    showChatWindow() {
        this.chatDisplayed = true;
    }

    removeChatWindow(display: boolean) {
        this.chatDisplayed = display;
    }

}
