import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdleStatus } from '../../../model';
import { IdleMessageService } from '../../../core';



import * as Rx from 'rxjs/Rx';

@Component({
    selector: 'minimized-window-container',
    templateUrl: './minimized-window-container.component.html',
    styleUrls: ['./minimized-window-container.component.css'],
    
})
export class MinimizeWindowContainerComponent implements OnInit, OnDestroy {


    private idleMessageContainer: IdleStatus[] = [];
    private ngUnsubscribe: Rx.Subject<void> = new Rx.Subject<void>();

    constructor(private idleMessageService: IdleMessageService) { }
    
    ngOnInit() {
        this.idleMessageService.getIdleMessage$().takeUntil(this.ngUnsubscribe).subscribe(res => {
            this.processIdleMessages(res);
        });

    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public processIdleMessages(res: IdleStatus) {
        let index = this.messageContainerIndex(res['conv_id']);
        if (index === -1) {
            this.idleMessageContainer.push(res);
        }
        else if (!res['connected']) {
            this.idleMessageContainer[index]['connected'] = false;
        }
        else {
            this.idleMessageContainer[index]['num_messages'] += 1;
        }

    }

    public messageContainerIndex(id: string): number {
        return this.idleMessageContainer.findIndex(x => x.conv_id === id);
    }

    public removeIdleMessageWindow(res: IdleStatus) {
        let index = this.messageContainerIndex(res['conv_id']);

        if (index !== -1) {
            this.idleMessageService.sendWindowRestore(res['conv_id']);
            this.idleMessageContainer.splice(index, 1);
        }
    }
    
}