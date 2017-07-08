import { DirectLineOptions } from 'botframework-directlinejs';
import { User } from 'botframework-directlinejs';
import { Injectable } from '@angular/core';
import { Conversation } from 'botframework-directlinejs';
import * as uuid from 'uuid/v1';

@Injectable()
export class UserService{


    constructor() { }

    public generateNewID(user: User) {
        user.id = uuid();
    }

    public requestLiveSupport() {

    }



}