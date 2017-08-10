
//ng libs
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//rxjs lib
import * as Rx from 'rxjs/Rx';

//models
import { AgentMessage } from '../../../model';
import { SocketMessageService } from '../../../core';




@Component({
    selector: 'agent-group-chat',
    templateUrl: './agent-group-chat.component.html',
    styleUrls: ['./agent-group-chat.component.css'],
})
export class AgentGroupChatComponent implements OnInit, OnDestroy {

    private agentMessageQueue: AgentMessage[] = [];
    private agentMessageObservable: Rx.Observable<AgentMessage>;
    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();
    private defaultVal: string = null;

    private user: string = "James Lee";;

    constructor(private socketService: SocketMessageService) { }

    ngOnInit() {
        //this.getAgentMessages();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public getAgentMessages() {
        this.agentMessageObservable = this.socketService.agentMessage$
            .filter(res => res['messageType'] == 0).map(res => JSON.parse(res['data']));
            //.map(res => this.socketService.parseSocketAgentMessage(res))
            //.takeUntil(this.ngUnsubscribe);
        this.agentMessageObservable.subscribe(res => {
            console.log(res);
            //this.agentMessageQueue.push(res);
        });
    }

    public sendMessage(msg: string) {
        this.defaultVal = '';
        if (msg !== '') {
            let ag = {userName: this.user, timeStamp: new Date().toISOString(), text: msg } as AgentMessage;
            console.log(ag.timeStamp + "  " + ag.text);
            this.socketService.pushAgentMessage(ag).subscribe(res => console.log(res));


        }
    }
}
