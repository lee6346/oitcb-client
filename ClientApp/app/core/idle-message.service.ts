import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

import { IdleStatus } from '../model';

@Injectable()
export class IdleMessageService {


    private idleMessage: Rx.Subject<IdleStatus> = new Rx.Subject<IdleStatus>();
    private windowRestore: Rx.Subject<string> = new Rx.Subject<string>();

    public getIdleMessage$(): Rx.Observable<IdleStatus> {
        return this.idleMessage.asObservable();
    }

    public getWindowRestore$(): Rx.Observable<string> {
        return this.windowRestore.asObservable();
    }



    public  sendIdleMessage(idle: IdleStatus) {
        this.idleMessage.next(idle);
    }

    public sendWindowRestore(id: string) {
        this.windowRestore.next(id);
    }

}