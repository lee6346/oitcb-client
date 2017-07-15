// directline lib
import { DirectLine, ConnectionStatus, IActivity } from 'botframework-directlinejs';

// services
import { ChatConnectionService } from './chat-connection.service';

// rxjs lib
import { Observable } from 'rxjs/Observable';

//ang lib
import { Injectable } from '@angular/core';




@Injectable()
export class ChatService {


    //wtf is this??
    botHandle: string = 'AskRowdy';

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
    public receiveActivity$(directLine: DirectLine): Observable<IActivity>{
        return directLine.activity$;
    }

    //receive observable of activity object filtered for a specific type
    public receiveFilterActivity$(directLine: DirectLine, filter: string = ''): Observable<IActivity> {
        
        if (!filter) {
          return this.receiveActivity$(directLine);
        } 
        else {
            return directLine.activity$.filter(
                activity => activity.type === filter);
        }
    }
    // receive observable of activity object only from the bot
    public receiveBotActivity$(directLine: DirectLine): Observable<IActivity> {
        return directLine.activity$.filter(
            activity => activity.from.id === this.botHandle
        );
    }
    /*
    Need to create functions for rendering activity cards when receiving
    */

}







