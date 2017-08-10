import { DirectLine, Activity, Conversation, EventActivity} from 'botframework-directlinejs';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import * as Rx from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { ChatBotConnectionService } from './chatbot-connection.service';

@Injectable()
export class ChatBotActivityService {



    private botHandle: string = 'AskRowdy';
    private activitySetUrl: string = 'https://directline.botframework.com/v3/directline/conversations/';


    constructor(private http: Http) { }


    public getDirectLine(conversation: Conversation): DirectLine {
        if (conversation['streamUrl']) {
            return new DirectLine({
                token: conversation['token'],
                conversationId: conversation['conversationId'],
                webSocket: true,
                streamUrl: conversation['streamUrl']
            });
        }
        else {
            return new DirectLine({
                token: conversation['token'],
                webSocket: true,
            });
        }
    }


    //send a text message to the bot
    public sendMessage(directLine: DirectLine, act: Activity) {
        directLine.postActivity(act).subscribe(
            id => console.log("posted activity, assigned ID ", id),
            error => console.log("Error posting activity", error));
    }

    //this event notifies the bot of switching to the agent and is sent prior to unsubscribing from bot to 
    //maintain a connection
    public sendCloseEvent(directLine: DirectLine, userid: string) {
        let closeActivity = { from: { id: userid }, type: "message", id: 'closeConnection' } as Activity;
        directLine.postActivity(closeActivity).subscribe(
            res => console.log(res),
            err => console.log(err),
            () => console.log("done")
            );
    }

    public sendCloseConnectionEvent(directLine: DirectLine, conversationId: string, userName: string) {
        let act = { type: 'message', from: { id: 'closeConnection', name: userName }} as Activity;
        directLine.postActivity(act).subscribe(res => console.log(res));
    }

    public getChatHistory(id: string, token: string, watermark: string = ''): Rx.Observable<Activity[]> {
        return this.http.get(this.activitySetUrl + id + '/activities', this.getActivityRequestOptions(token))
            .map(res => res.json()['activities']);
    }

    public botMessageFilter(act: Activity) {
        return act.type === 'message' && act.from.id === this.botHandle;
    }

    public agentMessageFilter(act: Activity, userid: string) {
        return act.type === 'message' && act.from.id !== this.botHandle && act.from.id !== userid;
    }
    public getActivityRequestOptions(token: string): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + token);
        return new RequestOptions({headers: headers });
    }


    


}







