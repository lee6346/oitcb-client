import { DirectLine, Activity, Conversation, EventActivity} from 'botframework-directlinejs';

import * as Rx from 'rxjs/Rx';

import { Injectable } from '@angular/core';

import { ChatBotConnectionService } from './chatbot-connection.service';

@Injectable()
export class ChatBotActivityService {



    private botHandle: string = 'AskRowdy';



    constructor() { }


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
    public sendSwitchEvent(directLine: DirectLine, userid: string) {
        let event = { from: { id: userid }, type: "event" } as EventActivity;
        directLine.postActivity(event).subscribe(
            res => console.log(res),
            err => console.log(err),
            () => console.log("done")
            );
    }

    public botMessageFilter(act: Activity) {
        return act.type === 'message' && act.from.id === this.botHandle;
    }

    public agentMessageFilter(act: Activity, userid: string) {
        return act.type === 'message' && act.from.id !== this.botHandle && act.from.id !== userid;
    }



    


}







