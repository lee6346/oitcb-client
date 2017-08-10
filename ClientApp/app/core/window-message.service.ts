import { Injectable } from '@angular/core';
import { HiddenMessage, MessageTransfer } from '../model';
import { Activity } from 'botframework-directlinejs';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WindowMessageService {

    private hiddenMessageSubject: Rx.Subject<HiddenMessage> = new Rx.Subject<HiddenMessage>();
    private windowStatusSubject: Rx.Subject<string> = new Rx.Subject<string>();
    private activityTransmitter: Rx.Subject<Activity> = new Rx.Subject<Activity>();
    

    public hiddenMessageObservable$: Rx.Observable<HiddenMessage> = this.hiddenMessageSubject.asObservable();
    public windowStatusObservable$: Rx.Observable<string> = this.windowStatusSubject.asObservable();
    public selfActivityReceiver$: Rx.Observable<Activity> = this.activityTransmitter.asObservable();


    public sendHiddenMessage(msg: HiddenMessage) {
        this.hiddenMessageSubject.next(msg);
    }

    public sendWindowStatus(id: string) {
        this.windowStatusSubject.next(id);
    }

    public messageCurrentWindow(act: Activity) {
        this.activityTransmitter.next(act);
    }
}