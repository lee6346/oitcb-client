import { Component, Output, OnInit, EventEmitter } from '@angular/core';


@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css']
})

export class ChatWindowComponent{


    @Output() deleteWindow: EventEmitter<boolean>;

    private windowShowin
    //private Messages: string[];


    constructor() {
        this.deleteWindow = new EventEmitter<boolean>();
    }

    public closeWindow(): void {
        this.deleteWindow.emit(false);
    }

}