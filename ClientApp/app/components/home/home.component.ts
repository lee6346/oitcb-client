
import { Component} from '@angular/core';

import { TestModal } from '../test-modal/test-modal';


//services
import { ChatAuthenticationService } from '../../services/chat-authentication.service';
import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ChatService, ChatConnectionService, UserService, ChatAuthenticationService], 
})
export class HomeComponent {

    public showModal: boolean = false;

    constructor() {
        
    }
    showConver() {
        this.showModal = true;
    }

    removeConver(showModal: boolean) {
        this.showModal = showModal;
    }



}
