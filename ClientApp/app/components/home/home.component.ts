
import { Component} from '@angular/core';

import { TestModal } from '../test-modal/test-modal';


//services
import { ChatAuthenticationService } from '../../services/chat-authentication.service';
import { ChatService } from '../../services/chat.service';
import { ChatConnectionService } from '../../services/chat-connection.service';
import { UserService } from '../../services/user.service';
//test
import { LiveRequest } from '../../model/LiveRequest';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ChatService, ChatConnectionService, UserService, ChatAuthenticationService], 
})
export class HomeComponent {

    public showModal: boolean = false;
    //test
    public users: LiveRequest[];
    public requestUrl: string = 'localhost:523131/api/AgentTransfer/PendingRequests';

    constructor(private http: Http) {
        
    }
    showConver() {
        this.showModal = true;
    }

    removeConver(showModal: boolean) {
        this.showModal = showModal;
    }
    //test
    clickMe() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.requestUrl, options).subscribe(res => { this.users = res.json(); }, error => console.log("Error: " + error));
    }


}
