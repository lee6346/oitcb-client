// directline lib
import { DirectLine, ConnectionStatus, IActivity, Activity, CardAction} from 'botframework-directlinejs';

// rxjs lib
import * as Rx from 'rxjs/Rx';

//ang lib
import { Injectable } from '@angular/core';


import { ChatBotConnectionService } from './chatbot-connection.service';

@Injectable()
export class ChatBotActivityService {


    //identifier (uid) for the bot
    private botHandle: string = 'AskRowdy';

    constructor() { }


    //send a text message to the bot
    public sendMessage(directLine: DirectLine, msg: string, uuid: string, user_name = '') {
        directLine.postActivity({
            from: { id: uuid },
            type: 'message',
            text: msg
        }).subscribe(
            id => console.log("posted activity, assigned ID ", id),
            error => console.log("Error posting activity", error));
    }

    //return observable of activity object
    public receiveActivity$(directLine: DirectLine): Rx.Observable<IActivity> {
        return directLine.activity$;
    }

    // receive observable of activity object only from the bot
    public receiveBotActivity$(directLine: DirectLine): Rx.Observable<IActivity> {
        return directLine.activity$.filter(
            activity => activity.from.id === this.botHandle
        );
    }

    // receive activities from live users only 
    public receiveLiveActivity$(directLine: DirectLine, uid: string): Rx.Observable<IActivity> {
        return directLine.activity$.filter(
            activity => activity.from.id !== this.botHandle && activity.from.id !== uid
        );
    }


}







