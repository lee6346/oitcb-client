import { Component, Directive, HostListener, ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Directive({
    selector: '[bars-effects]'
})
export class NotificationBarDirective {

    constructor(public elRef: ElementRef) { }


}