import { Component, Directive, HostListener, ElementRef, EventEmitter, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
@Directive({
    selector: '[draggable-element]'
})
export class DraggableElementDirective implements OnInit {

    mousedrag;
    mouseup = new EventEmitter<MouseEvent>();
    mousedown = new EventEmitter<MouseEvent>();
    mousemove = new EventEmitter<MouseEvent>();

    @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
        this.mouseup.emit(event);
    }

    @HostListener('document:mousedown', ['$event']) onMouseDown(event: MouseEvent) {
        this.mousedown.emit(event);
    }

    @HostListener('document:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
        this.mousemove.emit(event);
    }


    constructor(public elRef: ElementRef) {

        this.elRef.nativeElement.style.position = 'relative';
        this.elRef.nativeElement.style.cursor = 'pointer';

        this.mousedrag = this.mousedown.map(event => {
            return {
                left: event.clientX - this.elRef.nativeElement.getBoundingClientRect().left,
                top: event.clientY - this.elRef.nativeElement.getBoundingCLientRect().top
            };
        }).flatMap(imageOffset => this.mousemove.map(pos => ({
            top: pos.clientY - imageOffset.top,
            left: pos.clientX - imageOffset.left
        }))).takeUntil(this.mouseup);

    }

    ngOnInit() {
        this.mousedrag.subscribe({
            next: post => {
                this.elRef
            }
        })
    }
}
