import { DirectLine } from 'botframework-directlinejs';
import { ConnectionStatus } from 'botframework-directlinejs';
import { UUID } from 'uuid/v1';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as uuid from 'uuid/v1';


@Injectable()
export class ChatService {
    
    constructor() {}
    //send a message to the bot
    sendMessage(directLine: DirectLine, msg:string, uuid:string,  user_name = '') {
            directLine.postActivity({
            from: { id: uuid },
            type: 'message',
            text: msg
        }).subscribe(
            id => console.log("posted activity, assigned ID ", id),
            error => console.log("Error posting activity", error));
    }

   //receive an activity from the bot
    receiveActivity(directLine : DirectLine){
        return directLine.activity$.subscribe(
            activity => console.log("Received and activity", activity));
    }
    //receive activities of a specified type
    receiveFilterActivity(directLine: DirectLine, filter: string = '') {
        
        if (!filter) {
          return this.receiveActivity(directLine);
        } 
        else {
            return directLine.activity$.filter(
                activity => activity.type === filter)
                .subscribe(
                message => console.log("receives a message", message));

        }
    }

    //should use rxjs to genereate different types of activies to send and receives

}







