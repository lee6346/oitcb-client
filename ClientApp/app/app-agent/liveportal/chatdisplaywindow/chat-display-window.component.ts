//ng libs
import { Component, OnInit, OnDestroy, EventEmitter, Injector, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

//rxjs libs
import * as Rx from 'rxjs/Rx';

//direct line
import { DirectLine, Conversation, Activity } from 'botframework-directlinejs';

//services
import {
    ChatBotActivityService, ChannelConnectionService,
    WindowMessageService, SocketMessageService
} from '../../../core';

import { Message, HiddenMessage, MessageTransfer, LiveRequest} from '../../../model';

//models
import * as uuid from 'uuid/v1';


//child components
import { ChatHistoryWindowComponent } from '../chathistorywindow/chat-history-window.component';

@Component({
    selector: 'chat-display-window',
    templateUrl: './chat-display-window.component.html',
    styleUrls: ['./chat-display-window.component.css'],
})
export class ChatDisplayWindowComponent implements OnInit, OnDestroy {
    

    private agentName: string = 'agent';
    private botHandle: string;
    public close = new EventEmitter();

    private agentId: string;
    private conversationId: string;
    private token: string;
    private channelType: string;
    private historyLog: Rx.Observable<Message>;
    private directLine: DirectLine;
    
    private messages: Activity[] = [];
    private activitySet: Activity[] = [];
    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();
    private displayWindow: boolean = true;
    private closeConnectionActivity: Activity = { from: { id: 'Default' }, type: 'message', text: 'The student has closed the connection' };
    constructor(private injector: Injector,
        private channelService: ChannelConnectionService,
        private chatBotActivityService: ChatBotActivityService,
        private windowService: WindowMessageService,
        private socketMessage: SocketMessageService
    )
    {
        this.conversationId = this.injector.get('conv_id');
        this.channelType = this.injector.get('window_type');
        this.agentId = this.injector.get('uid');
        if (this.channelType === 'chat') {
            this.botHandle = 'AskRowdy';
        }

        //test
        //console.log("conv_id: " + this.conversationId + "uid: " + this.agentId + "type: " + this.channelType + " from constructor");
    }

    ngOnInit() {
        this.subscribeToWindowStatus();
        this.subscribeToDirectLineMessage();
        this.subscribeToInputMessage();
        //this.subscribtToLiveRequests();
    }

    ngOnDestroy() {
        //console.log('removing display: ' + this.conversationId);
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public subscribeToInputMessage() {
        this.windowService.selfActivityReceiver$.filter(x => x.conversation.id === this.conversationId)
            .takeUntil(this.ngUnsubscribe).subscribe(res => {
                //console.log("from display: " + res.from.id);
                this.messages.push(res);
                this.chatBotActivityService.sendMessage(this.directLine, res);
            });
    }

    public subscribeToDirectLineMessage() {
        this.channelService.getConnectionUrl$(this.conversationId).subscribe(res => {
            this.token = res.token;
            this.directLine = this.chatBotActivityService
                .getDirectLine({ conversationId: this.conversationId, token: this.token, streamUrl: res['streamUrl'] } as Conversation);
            //console.log(this.directLine);
            this.getPastActivities(this.conversationId, this.token);
            this.directLine.activity$.filter(x => this.filterStudentMessage(x))
                .takeUntil(this.ngUnsubscribe).subscribe(res => {
                    console.log(res);
                    this.processIncomingMessages(res);
                });
        });
    }

    public subscribeToWindowStatus() {
        this.windowService.windowStatusObservable$
            .takeUntil(this.ngUnsubscribe).subscribe(res => {
                this.checkWindowStatus(res);
            });
    }
    // only for watch displays
    public subscribtToLiveRequests() {
        if (this.channelType === 'watch') {
            this.socketMessage.liveRequestMessage$.filter(res => res['messageType'] == 0)
                .map(res => this.socketMessage.parseSocketLiveRequest(res)).takeUntil(this.ngUnsubscribe)
                .subscribe(res => {
                    console.log(res);
                    this.processLiveRequest(res);
                });
        }
    }

    public processLiveRequest(lr: LiveRequest) {
        if (!this.displayWindow) {
            this.windowService.sendHiddenMessage({
                conversationId: this.conversationId,
                userId: this.agentId, channelType: this.channelType, liveRequest: true
            } as HiddenMessage);
        }
        console.log(lr);
        this.channelType = 'chat';
        this.botHandle = 'AskRowdy';
        this.messages.push({ from: { id: 'Notice', name: 'Notice' }, text: 'This Window Is Now A Live Request' } as Activity);
    }

    

    public checkWindowStatus(id: string) {
        if ((this.displayWindow == true) && (this.conversationId !== id)) {
            //console.log('windows dont match for conv: ' + this.conversationId);
            this.hideWindow();
        }
        else if ((this.displayWindow == false) && (this.conversationId === id)) {
            //console.log('windows match for hidden, redisplaying: ' + this.conversationId);
            this.displayWindow = true;
        }
    }

    public getPastActivities(id: string, token: string) {
        this.chatBotActivityService.getChatHistory(id, token).flatMap(x => x)
            .filter(x => x.type === 'message').subscribe(res => {
                this.activitySet.push(res);
            });
    }

    public hideWindow() {
        this.displayWindow = false;
        //console.log('sending initial notice to minimize for: ' + this.conversationId);
        
        this.windowService.sendHiddenMessage({
            conversationId: this.conversationId,
            userId: this.agentId,
            channelType: this.channelType,
        });
    }

    public closeWindow() {
        this.chatBotActivityService.sendCloseConnectionEvent(this.directLine, this.conversationId, this.agentName);
        this.close.emit('event');
        console.log('exiting');
    }

 
    
    public filterStudentMessage(act: Activity) {
        return act.from.id !== this.botHandle && act.from.id !== this.agentId;
    }
    
    public processIncomingMessages(act: Activity) {

        if (!this.displayWindow) {
            console.log(act);
            this.windowService.sendHiddenMessage({
                conversationId: this.conversationId,
                userId: this.agentId, channelType: this.channelType
            } as HiddenMessage)
        }

        if (this.channelType === 'watch') {
            this.processLiveWatch(this.messages, act);
        }
        else {
            if (act.from.id === 'closeConnection')
                this.messages.push(this.closeConnectionActivity);
            else
                this.messages.push(act);
        }
    }


    public processLiveWatch(actArray: Activity[], act: Activity) {
        if (actArray.length < 1)
            actArray.push(act);
        else if (act.id > actArray[actArray.length - 1].id)
            actArray.push(act);
        else
            actArray.splice(actArray.length - 1, 0, act);
    }

    public msgAlignment(id: string) {
        if (id === this.agentId) {
            return {
                'align-window-right': true,
            };
        }
        else return {
            'align-window-left': true,
        };
    }

    public bubbleProperties(id: string) {
        if (id === this.agentId) {
            return {
                'align-window-right': true,
                'host-bubble': true,
            };
        }
        else if (id === 'Notice') {
            return {
                'align-window-right': true,
                'default-bubble': true,
            }
        }
        else {
            return {
                'align-window-left': true,
                'remote-bubble': true,
            };
        }
    }
    public chatbotMsgAlignment(id: string) {
        if (id !== 'AskRowdy') {
            return {
                'align-window-right': true,
            };
        }
        else return {
            'align-window-left': true,
        };
    }

    public chatbotBubbleProperties(id: string) {
        if (id !== 'AskRowdy') {
            return {
                'align-window-right': true,
                'host-bubble': true,
            };
        }
        else return {
            'align-window-left': true,
            'remote-bubble': true,
        };
    }


}