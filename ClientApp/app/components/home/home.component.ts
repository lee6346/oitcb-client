import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { DirectLine } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';

var uuid1 = require('uuid/v1');
// component that renders the home component hmtl when clicking <home> or [route /home]
var directLine = new DirectLine({
    secret: 'gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs',
    domain: 'https://directline.botframework.com/v3/directline',
    webSocket: true,
});

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {



    @ViewChild('chatModal')
    chatModal: ChatModalComponent;
    constructor(private viewContainerRef: ViewContainerRef) { }


    
    doSomething() {
        
        directLine.postActivity({
            from: { id: uuid1(), name:'' },
            type: 'message',
            text: 'a message for you, Bud'
        }).subscribe(
            id => console.log("Posted activity, assigned ID ", id),
            error => console.log("Error posting activity", error)
            );
  
    }

    chatWindow(event) {
        
        window.open(document.URL, '_blank', 'location=yes, height=570, width=520, scrollbars=yes, static=yes');
    }
}
