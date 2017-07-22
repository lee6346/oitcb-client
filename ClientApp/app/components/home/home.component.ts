
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
import { LiveRequestService } from '../../services/live-request.service';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ChatService, ChatConnectionService, UserService, ChatAuthenticationService, LiveRequestService], 
})
export class HomeComponent {

    public showModal: boolean = false;
    //test
    public users: string[];

    public requestUrl: string = '/api/AgentTransfer/MakeRequest';

    constructor(private liveservice: LiveRequestService) {
        
    }
    showConver() {
        this.showModal = true;
    }

    removeConver(showModal: boolean) {
        this.showModal = showModal;
    }
    //test
    clickMe() {

        this.liveservice.sendLiveRequest$("122-ds-3-dds").subscribe(msg => { console.log(msg) });

        /*
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        
        let conv = { ID: "jdiw-39=d32" };
        let conv2 = { action: 'remove', ID: "jdk-ssald" } ;
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.requestUrl, conv2, options).map(res => res.json()).subscribe(res => console.log(res), error => console.log("Error: " + error));
        */
    }


}
