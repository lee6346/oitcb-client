import { Component, OnInit, OnDestroy, EventEmitter, Injector } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

//rxjs libs
import * as Rx from 'rxjs/Rx';

@Component({
    selector: 'chat-history-window',
    templateUrl: './chat-history-window.component.html',
    styleUrls: ['./chat-history-window.component.css'],
})
export class ChatHistoryWindowComponent implements OnInit, OnDestroy {

    constructor() { }
    ngOnInit() { }
    ngOnDestroy() { }

    public trySomething() {
        window.alert("test");
    }
}