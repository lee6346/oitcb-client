import { Component, Directive, HostListener, ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Directive({
    selector: '[pend-request]'
})
export class PendRequestDirective {

    constructor(public elRef: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {

    }

}