import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

// component that renders the home component hmtl when clicking <home> or [route /home]

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})


export class HomeComponent {

    @ViewChild('chatModal')
    chatModal: ChatModalComponent;
    constructor(private viewContainerRef: ViewContainerRef) { }

    doSomething() {
        window.alert("HELLO!");
    }

    chatWindow(event) {
        
        window.open(document.URL, '_blank', 'location=yes, height=570, width=520, scrollbars=yes, static=yes');
    }
}
