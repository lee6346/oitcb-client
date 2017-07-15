import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v1';

/* This service should later coordinate with auth services to service the user interface for the bot
   to interact by user name
*/
@Injectable()
export class UserService{


    constructor(private uidMaker : uuid) { }

    public generateNewID() : string {
        return this.uidMaker();
    }




}