// holds user, conversaion, etc
import { User } from 'botframework-directlinejs';
import { Injectable } from '@angular/core';
// contains all profiles services (user, conversation, activity, MessageTyping, )
//maybe it should go in the 



@Injectable()
export class ChatStateService{

    private userState: User;

    constructor() { }



}