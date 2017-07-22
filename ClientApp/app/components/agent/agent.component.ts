
import * as Rx from 'rxjs/Rx';
import { Component , OnInit, OnDestroy} from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { LiveRequest } from '../../model/LiveRequest';
import { ISubscription } from "rxjs/Subscription";
@Component({
    selector: 'agent',
    templateUrl: './agent.component.html',
    providers: [WebsocketService]
})
export class AgentComponent implements OnInit, OnDestroy {

    private liveQueue: LiveRequest[];
    private sock_id: string;
    private request_obs: Rx.Observable<LiveRequest[]>;
    private mysubscription: ISubscription;
    constructor(private ws: WebsocketService) {
    }
    //public url: string = "ws://localhost:5000/socketconnection";

    ngOnInit() {
        this.request_obs = this.ws.connectWebSocket$();
        
        this.request_obs.first().subscribe(res => { this.sock_id = res["data"]});
        this.mysubscription = this.request_obs.skip(1).subscribe(res => { console.log(res) });
        
    }

    ngOnDestroy() {
        this.mysubscription.unsubscribe();
    }
    /*
    public getReq() {
        console.log("it worked");
        this.ws.
        this.ws.connectWebSocket$(this.url).subscribe(res => { console.log(res) }, err => console.log(err), ()=> console.log("complete"));
        console.log("it skipped");
    }
    */
}
